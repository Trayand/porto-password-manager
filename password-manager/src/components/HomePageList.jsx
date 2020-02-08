import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { useSelector } from 'react-redux'
import Swala from '../config/Swal';
import { db } from '../config/firebase'

export default function HomePageList(props) {
    const user = useSelector(state => state.user)
    const [passwordsData, setPasswordsData] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('passwords').where('userId', '==', user.id)
            .onSnapshot(querySnapshot => {
                let todos = []
                querySnapshot.forEach(doc => {
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                console.log(todos)
                // setPasswordsData(todos)
                setPasswordsData(todos)
            })

        return () => {
            unsubscribe()
        }
    }, [user])

    const { SearchBar } = Search;

    const columns = [{
        dataField: 'urlLink',
        text: 'URL',
        sort: true
    }, {
        dataField: 'username',
        text: 'Username',
        sort: true
    }, {
        dataField: 'password',
        text: 'password',
        sort: true
    }, {
        dataField: 'createdAt.seconds',
        text: 'created',
        sort: true,
        editable: false,
        formatter: function (value, row, index) {
            return changeDateFormat(value)
        }
    }, {
        dataField: 'updatedAt.seconds',
        text: 'last updated',
        sort: true,
        editable: false,
        formatter: function (value, row, index) {
            return changeDateFormat(value)
        }
    }];

    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    const changeDateFormat = (cellval) => {
        var dateVal = cellval + "";
        if (cellval != null) {
            var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
        }
    }
    return (
        <ToolkitProvider
            bootstrap4
            keyField="id"
            data={passwordsData}
            columns={columns}
            search
            defaultSorted={defaultSorted}

        >
            {
                props => (
                    <div>
                        <div className="d-flex ml-4 align-items-center" >
                            <h5 className="mr-2" >Search: </h5>
                            <SearchBar {...props.searchProps} />
                        </div>
                        <hr />
                        <BootstrapTable
                            {...props.baseProps}
                            cellEdit={cellEditFactory({
                                mode: 'click',
                                onStartEdit: (row, column, rowIndex, columnIndex) => {
                                    console.log('start to edit!!!', row, column.dataField)
                                },
                                beforeSaveCell: (oldValue, newValue, row, column) => {
                                    console.log('Before Saving Cell!!', newValue, row);
                                },
                                afterSaveCell: (oldValue, newValue, row, column) => {
                                    console.log('After Saving Cell!!');
                                    db.collection("passwords")
                                        .doc(row.id)
                                        .set({
                                            ...row,
                                            [column.dataField]: newValue
                                        })
                                        .then(function () {
                                            console.log("Document updated");
                                            Swala('success', 'success update', 'success')
                                        })
                                        .catch(function (error) {
                                            // console.error("Error adding document: ", error);
                                            Swala('error', error.message, 'error')
                                        });
                                }
                            })}
                        />
                    </div>
                )
            }
        </ToolkitProvider>
    )
}