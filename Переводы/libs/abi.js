export const abi = [
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
        internalType: "string",
        name: "new_category",
        type: "string",
      },
    ],
    name: "createCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id_category",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "createSamples",
    outputs: [],
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
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "view_categories",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "view_samples",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "category_id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name_sample",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "sum",
            type: "uint256",
          },
        ],
        internalType: "struct perevodi.sample[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "view_transactions",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "resipient",
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
            internalType: "bool",
            name: "is_admin_answer",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "admin_answer",
            type: "bool",
          },
          {
            internalType: "bytes32",
            name: "code_word",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "date_send",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "date_accept",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "end",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "ateps",
            type: "uint256",
          },
        ],
        internalType: "struct perevodi.transact[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
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
