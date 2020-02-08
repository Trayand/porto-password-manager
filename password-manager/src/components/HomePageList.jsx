import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { useSelector } from 'react-redux'
import Swala from '../config/Swal';
import { db } from '../config/firebase'
import { Button } from 'react-bootstrap';

export default function HomePageList(props) {
    const user = useSelector(state => state.user)
    const [passwordsData, setPasswordsData] = useState([])
    const [selectedRow, setSelectedRow] = useState([])

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
                console.log(new Date().toLocaleDateString());
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
        dataField: 'createdAt.nanoseconds',
        text: 'created',
        sort: true,
        editable: false,
        formatter: function (value, row, index) {
            return changeDateFormat(value)
        }
    }, {
        dataField: 'updatedAt.nanoseconds',
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
        if (cellval != null) {
            return new Date(cellval).toLocaleString()
        }
    }

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            console.log(row.id);
            console.log(isSelect);
            let newArr = selectedRow
            if (isSelect) {
                newArr.push(row.id)
            } else {
                newArr = newArr.filter(value => value !== row.id)
            }
            setSelectedRow(newArr)
        },
        onSelectAll: (isSelect, rows, e) => {
            console.log(isSelect);
            console.log(rows);
            let newArr = []
            if (isSelect) newArr = rows
            else newArr = []
            setSelectedRow(newArr)
        }
    };

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
                            <Button className={selectedRow.length ? "disable btn ml-auto mr-4" : "btn ml-auto mr-4"} variant="outline-danger" >Delete selected</Button>
                        </div>
                        <hr />
                        <BootstrapTable
                            {...props.baseProps}
                            selectRow={selectRow}
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
                                            [column.dataField]: newValue,
                                            updatedAt: { nanoseconds: new Date().getTime(), seconds: new Date().getTime() / 1000 }
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