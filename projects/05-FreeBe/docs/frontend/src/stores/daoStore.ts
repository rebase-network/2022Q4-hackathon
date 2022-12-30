import type { Dao, DaoCreateEditParams, DaoListReq, DaoNumber } from '@/types/Dao';
import { defineStore } from 'pinia';
import type { Status } from '@/types/Status';
import { DaoAPI } from '@/api/Dao/DaoAPI';


import { ethers } from "ethers";
const contractAddress = "0x802C257Db565a6b0D1cdD4C7D876a70f3C97bd66"
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
]
const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);
const contractAsSigner = contract.connect(signer);

type States = {
  daoList: {
    [daoState in DaoNumber]: {
      result: Dao[];
      status: Status;
    }
  },
  daoCreateList: {
    result: Partial<Dao>,
    status: Status,
  },
  daoDomain: string
};

type Getters = {};
type Actions = {
  getDaoList(args: DaoListReq): Promise<void>;
  createDao(args: DaoCreateEditParams): Promise<void>;
  setDomain(args: string): Promise<void>;
  searchDomain(arg: string): Promise<void>;
};

export const useDaoStore = defineStore<'dao', States, Getters, Actions>('dao', {
  state: () => ({
    daoList: {
      1: {
        result: [],
        status: 'idle',
      }
    },
    daoCreateList: {
      result: {},
      status: 'idle',
    },
    daoDomain: ""
  }),
  getters: {},
  actions: {
    async getDaoList(arg) {
      // 更新加载状态
      this.daoList[arg.action].status = "loading";
      // 捕获错误
      try {
        const response = await DaoAPI.getDaoList(arg);
        console.log(response);
        this.daoList[arg.action].result = response.data;
        this.daoList[arg.action].status = "success";
      } catch (error) {
        this.daoList[arg.action].status = "error";
      }
    },
    async createDao(arg) {
      this.daoCreateList.status = "loading";
      try {
        // const response = await DaoAPI.handleCreateDao(arg);
        const db_response = await contractAsSigner.createDao(this.daoDomain, arg.dao_name, arg.dao_image, arg.mission, arg.theme_color);
        // console.log(response, ' response');
        console.log(db_response, ' db_response');
        // this.daoCreateList.result = response.data;

        this.daoCreateList.status = "success";
      } catch (error) {
        this.daoCreateList.status = "error";
      }
    },
    async setDomain(arg) {
      this.daoDomain = arg;
    },
    async searchDomain(arg) {
      let isExist = await contractAsSigner.searchDomian(arg)
      return isExist
    }
  },
});
