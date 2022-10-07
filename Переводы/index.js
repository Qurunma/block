const contract = "0x44f9FE9D63289b5f5B5910E636bC95c4337dF732";
let web3, contractInstance, accounts;
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "code_word",
        type: "bytes32",
      },
    ],
    name: "accept_resipient",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idUser",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "new_category",
        type: "string",
      },
    ],
    name: "add_new_categori",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "cancel_transfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idTransact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "idUser",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "answer",
        type: "bool",
      },
    ],
    name: "check_safe_transact",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "category",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "safe_transact",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "code_word",
        type: "bytes32",
      },
    ],
    name: "people_transfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "login",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "password",
        type: "bytes32",
      },
    ],
    name: "registration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id_sample",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "code_word",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "safe_transact",
        type: "bool",
      },
    ],
    name: "transfer_template",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "usersV",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "login",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "password",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "role",
            type: "uint256",
          },
        ],
        internalType: "struct perevodi.users[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let bodyApp = document.querySelector(".App");
let inputGo = document.querySelector(".inputGo");

function network() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  console.log(web3);
  contractInstance = new web3.eth.Contract(abi, contract);
}
network();
getAccounts();

async function getAccounts() {
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  //   address.textContent = "Аккаунт: " + accounts[0];
  //   getBalance(accounts);
  //   select(accounts, address);
  return accounts;
}

inputGo.addEventListener("click", () => {
  registartion();
});

async function registartion() {
  let array = await contractInstance.methods
    .usersV()
    .call()
    .then((data) => data);

  login = document.querySelector(".login").value;
  password = document.querySelector(".password").value;

  if (login == "" || password == "") {
    alert("Все поля должон быть заполнены");
    return;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i].login == login) {
      console.log("aaaa");
      break;
    }
  }

  console.log(array);
}
