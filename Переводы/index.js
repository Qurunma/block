import { bodyApp } from "./variables.js";

const contractAddress = "0xb010B5061CfAcdbE3400EC81DA4D7fB68B8751FB";
let web3, contract, accounts, users;
const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
        internalType: "address",
        name: "candidate",
        type: "address",
      },
    ],
    name: "add_new_admin",
    outputs: [],
    stateMutability: "nonpayable",
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
      {
        internalType: "bool",
        name: "voteOfMan",
        type: "bool",
      },
    ],
    name: "add_vote",
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
    name: "register",
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
    name: "view_users",
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

function network() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  contract = new web3.eth.Contract(abi, contractAddress);
}
network();
getAccounts();

async function getAccounts() {
  accounts = await web3.eth.getAccounts();
  users = await contract.methods
    .view_users()
    .call()
    .then((data) => data);
  return accounts;
}

const button = document.createElement("button");
button.addEventListener("click", () => {
  getAccounts();
  console.log(users);
});
bodyApp().append(button);

export { users, contract, web3 };
