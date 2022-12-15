import Web3 from 'web3'

class ContractPlugin {
  constructor(paramaters, vue, web3) {
    this.vue = vue;
    this.web3 = web3 || new Web3(window.ethereum);

    this.methods = new Object();
    this.address = undefined;
    this.contract = this.initialize(paramaters);
  }

  initialize = (paramaters) => {
    const { fileName, abi, address } = paramaters;
    let complateABI = {abi: abi}, realAddress = address;

    if (typeof abi === "undefined") {
      complateABI = require("@/contracts/" + fileName + ".json")
    }

    if (typeof address === "undefined") {
      // console.log(this.vue.$root);
      const networkId = this.vue.$root.networkId;
      // console.log('NetWork ID: ', complateABI.networks[networkId]);
      if (typeof networkId === "undefined")
        throw new Error(this.vue.$t("ERROR.WALLET.NOT_CONNECT"));

      if (typeof complateABI.networks[networkId] === "undefined")
        throw new Error(this.vue.$t("ERROR.WALLET.NOT_SUPORT"));

      realAddress = complateABI.networks[networkId].address;
    }
    
    this.address = realAddress;
    // console.log('Contract Address', this.address);
    this.contract = new this.web3.eth.Contract(
      complateABI.abi, realAddress
    );

    const self = this, contract = this.contract;

    const toWeiValue = (v, el) => {
      if (el.type !== "payable") return 0;
      
      return this.contract.utils.toWei(v.toString());
    }, parseParamaters = (p, el) => {
      let parms = [];
      if (el.inputs.length <= 0) return parms;

      el.inputs.forEach((item) => {
        parms.push(p[item.name]);
      });

      return parms;
    }, parseErrorMessage = (e) => {
      if (e.code == 4001) return self.vue.$t("ERROR.WALLET.SIGNATURE");

      let rgx = /"message": ".+?"/g;
      const rgxResult = rgx.exec(e.toString());
      if (rgxResult) {
        var msg = Array.isArray(rgxResult) ? rgxResult[0] : rgxResult
        msg = JSON.parse("{"+msg+"}")
        return msg.message;
      } else {
        return e;
      }
    }, runTransfer = (element, paramaters) => {
      return new Promise((resolve, reject) => {
        if (!this.vue.$root.accounts)
          return reject(self.vue.$t("ERROR.WALLET.NOT_CONNECT_WALLET"));

        const { value } = paramaters || {value: 0};
        const method = contract.methods[element.name];
        const m = element.stateMutability === "view" ? "call" : "send";

        let data = { to: contract._address };
        data.from = this.vue.$root.accounts[0];
        data.value = toWeiValue(value, element);
        // console.log(data, paramaters)

        if (element.inputs.length <= 0) {
          method().estimateGas(data).then((gas) => {
            data.gas = gas;
            method()[m](data).then((res) => {
              return resolve(res);
            }).catch((e) => {
              return reject(parseErrorMessage(e));
            })
          }).catch((e) => {
            return reject(parseErrorMessage(e));
          })
        } else{
          let parms = parseParamaters(paramaters, element);
          method(...parms).estimateGas(data).then((gas) => {
            data.gas = gas;
            method(...parms)[m](data).then((res) => {
              return resolve(res);
            }).catch((e) => {
              return reject(parseErrorMessage(e));
            })
          }).catch((e) => {
            return reject(parseErrorMessage(e));
          })
        }
      });
    };

    this.contract._jsonInterface.forEach((element) => {
      if (element.type !== "function") return;

      this.methods[element.name] = function() {
        return runTransfer(element, arguments[0]);
      }
    });
  }
}

class KnowlageToken extends ContractPlugin {
  constructor(vue) {
    super({ fileName: 'KnowlageToken' }, vue)
  }
}

class MajorFactory extends ContractPlugin {
  constructor(vue, web3) {
    super({ fileName: 'MajorFactory' }, vue, web3)
  }
}

class SubjectTemplate extends ContractPlugin {
  constructor(vue, address, web3) {
    super({
      fileName: 'SubjectTemplate', address: address
    }, vue, web3)
  }
}

export default {
  install(Vue) {
    Vue.prototype.KnowlageToken = KnowlageToken;
    Vue.prototype.MajorFactory = MajorFactory;
    Vue.prototype.SubjectTemplate = SubjectTemplate;
  }
}