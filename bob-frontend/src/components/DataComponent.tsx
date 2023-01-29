import { Button, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import FormComponent from './FormComponent';


export type DataType = {
    id : number,
    firstName: string,
    lastName: string,
    birthday: Date,
    role: string,
    createdAt: Date,
    updatedAT: Date
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName'
    },
    {
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday'
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt'
    },
    {
        title: 'Updated at',
        dataIndex: 'updatedAt',
        key: 'updatedAt'
    },
];

function DataComponent() {
    const [data, setData] = React.useState<DataType[]>([]);
    const [selectedRow, setSelectedRow] = React.useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            await fetch('http://localhost:3001/api/users')
            .then((res) => {
                console.log(res);
                return res.json()
            })
            .then((data) => setData(data.users))
        };
        getData();
    }, [])

    const rowSelection = {
        selectedRow,        
        onChange: (newSelectedRowKeys: React.Key[]) => {setSelectedRow(newSelectedRowKeys)}
    };

    const showModal = () => {
        setIsModalOpen(true);
      };
    
    const handleCancel = () => {
        setIsModalOpen(false);
      };
    
    const onClickDelete = () => {
        let userId = selectedRow[0];
        fetch(`http://localhost:3001/api/users/${userId}`, {method: 'DELETE'})
        .then(() => {
            setData(
                data.filter((el) => {
                return el.id !== userId;
             })
            )
        })
    };

    const onSubmit = (val:DataType) => {
        fetch(`http://localhost:3001/api/users`, {
            method: 'POST',
            headers: {
                'COntent-Type' : 'application/json'
            },
            body: JSON.stringify(val)
        })
        .then((res) => {
            console.log(res)
            return res.json()
        })
        .then((newUser) => {
            let user = newUser.user;
            setData(oldData => [...oldData, user]);
            handleCancel();
        })
    }


    return (
        <div>  
            <Table 
            columns={columns}
            dataSource={[...data]}
            rowSelection={{
                type:'radio',
                ...rowSelection
            }}
            rowKey={(record) => record.id}>
            </Table>
            <div style={{display: 'flex'}}>
                <Button onClick={onClickDelete}>Effacer l'utilisateur</Button>
                <Button onClick={showModal}>Créer un utilisateur</Button>
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <FormComponent onSubmit={onSubmit}></FormComponent>
            </Modal>
        </div>
    );
}

export default DataComponent;