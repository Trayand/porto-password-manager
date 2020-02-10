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
    const [isLoading, setIsLoading] = useState(true)
    const [dot, setDot] = useState('.')
    const { SearchBar } = Search;

    // useEffect(() => {
    //     console.log(isLoading);
    // }, [passwordsData])

    useEffect(() => {
        const unsubscribe = db.collection('passwords').where('userId', '==', user.id)
            .onSnapshot(querySnapshot => {
                let passwordSaved = []
                querySnapshot.forEach(doc => {
                    passwordSaved.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setPasswordsData(passwordSaved)
                setIsLoading(false)
            })

        return () => {
            unsubscribe()
        }
    }, [user])

    const columns = [{
        dataField: 'urlLink',
        text: 'URL',
        sort: true,
        // },{
        //     dataField: 'image',
        //     text: 'image',
        //     render: function (value, row, index) {
        //         return imageAndText(value)
        //     }
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

    // const imageAndText = ( param ) => {
    //     if(param){
    //         return (
    //             <>
    //             <img src={param} alt=""/>
    //             </>
    //         )
    //     }
    // }

    const onHandleDelete = (e) => {
        e.preventDefault()
        if (selectedRow.length === 0) return
        var conf = window.confirm('are you sure to delete this??')
        if (!conf) return
        let promises = []
        selectedRow.forEach(element => {
            console.log(element, 'dari element for each');
            promises.push(db.collection('passwords').doc(element).delete())
        });
        Swala('success', 'deleted', 'success')

    }

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        clickToEdit: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            // console.log(row.id);
            // console.log(isSelect);
            let newArr = selectedRow
            if (isSelect) {
                newArr.push(row.id)
            } else {
                newArr = newArr.filter(value => value !== row.id)
            }
            setSelectedRow(newArr)
            console.log(selectedRow);
        },
        onSelectAll: (isSelect, rows, e) => {
            // console.log(isSelect);
            // console.log(rows);
            let newArr = []
            if (isSelect) rows.forEach(el => newArr.push(el.id))
            else newArr = []
            setSelectedRow(newArr)
            console.log(selectedRow);
        }
    };

    if (isLoading) {
        setInterval(() => {
            if (dot === '.') setDot('..')
            if (dot === '..') setDot('...')
            if (dot === '...') setDot('.')
        }, 500);
    }

    // const searchThis = (e) => {
    //     ToolkitProvider.search(e.target.value).draw();
    // }

    return (
        <>
            {
                isLoading
                    ? < span > Data loading{dot}</span>
                    : <ToolkitProvider
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
                                        <Button className="btn ml-auto mr-4" variant="outline-danger" onClick={onHandleDelete} >Delete selected</Button>
                                    </div>
                                    <small>click for select, double click for edit(`enter` for submit)</small>
                                    <hr />
                                    <BootstrapTable
                                        search
                                        {...props.baseProps}
                                        selectRow={selectRow}
                                        cellEdit={cellEditFactory({
                                            mode: 'dbclick',
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
            }
        </>
    )
}