import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input, Space} from "antd";
import Highlighter from "react-highlight-words";
import { useState, useRef } from "react";
import { SearchOutlined,EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [dataSource, setDataSource] = useState([{
    "id": 1,
    "firstName": "Mervin",
    "lastName": "Lindenberg",
    "email": "mlindenberg0@google.com.br",
    "phoneNumber": "641-736-0220"
  }, {
    "id": 2,
    "firstName": "Halimeda",
    "lastName": "Dannett",
    "email": "hdannett1@hc360.com",
    "phoneNumber": "461-553-1220"
  }, {
    "id": 3,
    "firstName": "Thorny",
    "lastName": "Showen",
    "email": "tshowen2@last.fm",
    "phoneNumber": "278-460-6615"
  }, {
    "id": 4,
    "firstName": "Edgar",
    "lastName": "Varren",
    "email": "evarren3@hexun.com",
    "phoneNumber": "627-437-8151"
  }, {
    "id": 5,
    "firstName": "Carson",
    "lastName": "Pavlov",
    "email": "cpavlov4@rakuten.co.jp",
    "phoneNumber": "964-897-6278"
  }, {
    "id": 6,
    "firstName": "Javier",
    "lastName": "Meadows",
    "email": "jmeadows5@biglobe.ne.jp",
    "phoneNumber": "468-794-3082"
  }, {
    "id": 7,
    "firstName": "Tibold",
    "lastName": "Ferryman",
    "email": "tferryman6@diigo.com",
    "phoneNumber": "881-574-9198"
  }, {
    "id": 8,
    "firstName": "Talya",
    "lastName": "Kigelman",
    "email": "tkigelman7@nature.com",
    "phoneNumber": "207-815-5841"
  }, {
    "id": 9,
    "firstName": "Cornie",
    "lastName": "McCreagh",
    "email": "cmccreagh8@ft.com",
    "phoneNumber": "644-358-4675"
  }, {
    "id": 10,
    "firstName": "Demetria",
    "lastName": "Bowerbank",
    "email": "dbowerbank9@amazon.co.uk",
    "phoneNumber": "774-764-4235"
}]
  );
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
     
      
    },
    {
      key: "2",
      title: "First Name",
      dataIndex: "firstName",
      
      ...getColumnSearchProps('firstName')
    },
    {
      key: "3",
      title: "Last Name",
      dataIndex: "lastName",
      
      ...getColumnSearchProps('lastName')
    },
    {
      key: "4",
      title: "Phone number",
      dataIndex: "phoneNumber",
     
      ...getColumnSearchProps('phoneNumber')
    },
    
   { key: "5",
    title: "Email Address",
    dataIndex: "email",
   
    ...getColumnSearchProps('email')
  },
 
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              style={{color:"green", }}
              onClick={() => {
                onEditUser(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteUser(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  
  const onDeleteUser = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this User record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((User) => User.id !== record.id);
        });
      },
    });
  };
  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit User data"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((User) => {
                if (User.id === editingUser.id) {
                  return editingUser;
                } else {
                  return User;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingUser?.firstName}
            onChange={(e) => {
              setEditingUser((pre) => {
                return { ...pre, firstName: e.target.value };
              });
            }}
          />
          <Input
            value={editingUser?.lastName}
            onChange={(e) => {
              setEditingUser((pre) => {
                return { ...pre, lastName: e.target.value };
              });
            }}
          />
          <Input
            value={editingUser?.phoneNumber}
            onChange={(e) => {
              setEditingUser((pre) => {
                return { ...pre, phoneNumber: e.target.value };
              });
            }}
          />
         
          <Input
            value={editingUser?.email}
            onChange={(e) => {
              setEditingUser((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
         
          

        </Modal>
      </header>
    </div>
  );
}

export default App;
