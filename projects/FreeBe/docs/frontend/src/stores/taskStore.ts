import type { Dao, DaoCreateEditParams, DaoListReq, DaoNumber } from '@/types/Dao';
import { defineStore } from 'pinia';
import type { Status } from '@/types/Status';
import { TaskAPI } from "@/api/Task/TaskAPI";
import { HtDaoTask, HandleEditTaskReq, TaskBaseInfo } from "@/types/Task";

import { ethers } from "ethers";
const contractAddress = "0x802C257Db565a6b0D1cdD4C7D876a70f3C97bd66";
const abi = [
  {
    "inputs": [
      {
        "internalType": "contract Dao",
        "name": "thedao",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "claimTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_daoDomain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_daoName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_daoLogo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_daoMission",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_daoColor",
        "type": "uint8"
      }
    ],
    "name": "createDao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract Dao",
        "name": "thedao",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_objective",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_results",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      }
    ],
    "name": "createTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "when",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getDaoList",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "daoDomain",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "daoName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "daoLogo",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "daoMission",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "daoColor",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "daoCreater",
            "type": "address"
          }
        ],
        "internalType": "struct baseDao[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract Dao",
        "name": "thedao",
        "type": "address"
      }
    ],
    "name": "getTaskList",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "objective",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "results",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "builder",
            "type": "address"
          }
        ],
        "internalType": "struct task[]",
        "name": "_taskList",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_domain",
        "type": "string"
      }
    ],
    "name": "searchDomian",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);
const contractAsSigner = contract.connect(signer);

type States = {
  taskList: {
    result: HandleEditTaskReq[],
    status: Status,
  }
};

type Getters = {};
type Actions = {
  createTask(args: HandleEditTaskReq): Promise<void>;
};

export const useTaskStore = defineStore<'dao', States, Getters, Actions>('dao', {
  state: () => ({
    taskList: {
      result: [],
      status: 'idle',
    },
  }),
  getters: {},
  actions: {
    async createTask(arg) {
      console.log(this.taskList.result);
      this.taskList.status = "loading";
      this.taskList.result = [...this.taskList.result, arg];
      try {
        const response = await TaskAPI.handleCreateTask(arg);
        const db_response = await contractAsSigner.claimTask(arg);
        this.taskList.status = "success";
      } catch (error) {
        this.taskList.status = "error";
      }
    },
  },
});
