<script setup lang="ts">
import { ethers, getDefaultProvider } from 'ethers';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

import { useUserStore } from '@/stores/userStore';

import { WalletState } from '@/types/Wallet';

import { ComputedRef, Ref } from 'vue';

const visible: Ref<boolean> = ref(false);
const userStore = useUserStore();
const { profile } = storeToRefs(userStore);

const userNavigation = [
  { name: 'Profile', href: '/MyDaos' },
  { name: 'Disconnect', href: '#' },
]

//  ---------------------- 
const visibleWallet = ref<WalletState>("not_wallet");

// Wallet Dialog Title
const title: ComputedRef<string> = computed(() => {
  switch (visibleWallet.value) {
    case "not_wallet":
      return "Wallet Not Found";
    case "not_connect":
      return "Connect Wallet";
    case "connected":
      return "Wallet Connected";
    default:
      return "";
  }
});

const walletList = [
  {
    name: "MetaMask",
    flag: true,
    iconPath: "./src/assets/images/metamask_medium.svg"
  },
  {
    name: "WalletConnect",
    flag: false,
    iconPath: "./src/assets/images/wallet_connect.svg",
  },
]

// 连接 ————————————————----------------
const walletAddress = ref('');
const networkChain = ref('');
let provider = ethers.getDefaultProvider();

async function UserConnectWallet() {
  visible.value = true;

  if (typeof (window as any).ethereum === 'undefined' && (window as any).ethereum?.isMetaMask) {
    visibleWallet.value = "not_wallet";
    return;
  }

  if (ethers) {
    visibleWallet.value = "not_connect";
    // await (window as any).ethereum.enable();
    return;
  }

  if (!isPolygonAddress()) {
    visibleWallet.value = "connected";
    return;
  }
}

async function handleConnectWallte(name: string) {
  if (name !== "MetaMask") return
  if (typeof (window as any).ethereum !== 'undefined' && !(window as any).ethereum?.isMetaMask) return
  await (window as any).ethereum?.enable();
  const accounts = await (window as any).ethereum?.request({ method: 'eth_requestAccounts' });
  walletAddress.value = accounts[0];
  await userStore.login({
    head_image: "test", // 头像hash
    name: walletAddress.value,
    wallet_address: walletAddress.value,
    wallet_type: 1 // 1:以太坊钱包
  })
  console.log(`Current account: ${walletAddress.value}`);
}

// 切换 ---------------------------
// 写一个钱包网络类
const currentNetwork = ref("Ethereum Mainnet");
// 当前支持的网络
const networks = ref([{
  title: "Polygon",
  pkid: 1
}])

async function isPolygonAddress() {
  const network = await provider.getNetwork();
  if (network.name === 'polygon') {
    return true;
  }

  return false;
}

// 切换网络逻辑
const onNectworkChange = async (e: string) => {
  // 判断钱包当前网络 
  if (e === 'Polygon' && currentNetwork.value !== "Polygon") {
    // await (window as any).ethereum?.enable();
    await isPolygonAddress() ? "" : provider = getDefaultProvider('polygon');
  }
}

// const addNetwork = () => {
//     typeof (window as any).ethereum.request({
//         method: 'wallet_addEthereumChain', // Metamask的api名称
//         params: [{
//             chainId: "0x80", // 网络id，16进制的字符串
//             chainName: "HecoMain", // 添加到钱包后显示的网络名称
//             rpcUrls: [
//                 'https://polygon-rpc.com', // rpc地址
//             ],
//             iconUrls: [
//                 'https://testnet.hecoinfo.com/favicon.png' // 网络的图标，暂时没看到在哪里会显示
//             ],
//             blockExplorerUrls: [
//                 'https://hecoinfo.com' // 网络对应的区块浏览器
//             ],
//             nativeCurrency: {  // 网络主币的信息
//                 name: 'HT',
//                 symbol: 'HT',
//                 decimals: 18
//             }
//         }]
//     })
// }


// async function login() {
//   try {
//     (window as any).ethereum
//       .request({
//         method: "eth_requestAccounts",
//       })
//       .then((accounts: any[]) => {
//         const chainId = (window as any).ethereum.chainId;
//         console.log(accounts[0]);
//         walletAddress.value = accounts[0];
//       });
//   } catch (e) {
//     console.log(e);
//   }
// }

// ethereum.on("accountsChanged", async function (accounts) {
//   console.log(accounts);
//   _this.login();
// });
// ethereum.on("chainChanged", function (chainId) {
//   console.log("chainId", chainId);
//   _this.chainId = chainId;
//   _this.login();
// });

// async function switchChain() {
//   try {
//     await (window as any).ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: networkChain.value }],
//     });
//   } catch (switchError: Error) {
//     // This error code indicates that the chain has not been added to MetaMask.
//     if (switchError?.code === 4902) {
//       try {
//         await (window as any).ethereum.request({
//           method: "wallet_addEthereumChain",
//           params: [
//             {
//               chainId: networkChain.value,
//               rpcUrl: "https://polygon-rpc.com" /* ... */,
//             },
//           ],
//         });
//       } catch (addError) {
//       }
//     }
//   }
// }
</script>

<template>
  <div id="FreeAccount">
    <template v-if="profile.result.wallet_address">
      <Menu as="div" class="relative ">
        <div>
          <MenuButton>
            <span class="sr-only">Open user menu</span>
            <div class="dao_account_box w-1">
              <img :src="profile?.result.head_image" class="w-6 h-6 mr-4 ">
              <span class="wallet_name">
                {{ (profile.result.wallet_address!).slice(0, 10) }}
              </span>
            </div>
          </MenuButton>
        </div>
        <transition enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95">
          <MenuItems
            class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
            <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{
                item.name
            }}</a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </template>

    <template v-else>
      <a href="javascript:" @click="UserConnectWallet()">
        <div class="dao_account_connect bg-sky-500 hover:bg-sky-700">
          <span>Connect Wallet</span>
        </div>
      </a>

      <FreeDialog v-model:visible="visible" :title="title">
        <template #header>
        </template>
        <template #body>
          <template v-if="visibleWallet === 'not_wallet'">
            <FreePrompt type="default"
              msg="Don’t have a wallet yet? <a href='https://metamask.io/' target='_blank'><strong>Click here</s></strong> to get a MetaMask wallet." />
          </template>
          <template v-if="visibleWallet === 'not_connect'">
            <div class="wallet_box">
              <li class="sm_wallet_box" v-for="(item, index) in walletList" :key="index"
                :class="[!item.flag ? 'unOption_walletbox' : 'options_walletbox']"
                @click="handleConnectWallte(item.name)">
                <img :src="item.iconPath" alt="">
                <p style="font-weight: 500;">{{ item.name }}</p>
                <p class="un_available" :class="[!item.flag ? 'show_msg' : '']">Comming soon</p>
              </li>
            </div>
          </template>
          <template v-if="visibleWallet === 'connected'">
            <FreePrompt type="default" msg="Please switch to the Polygon Network to interact with FreeBe." />
            <div class="select_network_box">
              <!-- 暂时write die -->
              <img src="@/assets/images/metamask_medium.svg" alt="">
              <div class="select_network">
                <span></span>
                <FreeSelect :select-options="networks" :defualt="currentNetwork"
                  @update:title="onNectworkChange($event)" />
              </div>
              <!-- User Wallet -->
              <img src="@/assets/images/metamask_wallet_element.svg" alt="">
            </div>
          </template>
        </template>
      </FreeDialog>
    </template>
  </div>
</template>


<style scoped lang="less">
#FreeAccount {
  width: 180px;
  height: 50px;
  border-radius: 8px;

  .dao_account_box {
    width: 11.25rem;
    height: 3.125rem;
    border: solid 2px #e6e8ec;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .wallet_name {
      font-family: HelveticaNeue;
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #131415;
    }

    &:hover {
      border: cyan-primary-color;
    }
  }

  .dao_account_connect {
    width: 100%;
    height: 100%;
    background-color: #131415;
    text-align: center;
    line-height: 50px;
    border-radius: 24px;

    span {
      color: #e6e8ec;
      font-weight: 700;
    }

    &:hover {
      background-color: #3e4144;
    }
  }

  .wallet_box {
    display: flex;
    justify-content: space-evenly;

    li {
      width: 180px;
      height: 180px;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      background-color: rgb(238, 238, 238);
      border: 1px solid transparent;
      position: relative;

      img {
        width: 75px;
        height: 75px;
        vertical-align: middle;
        margin: 10px auto;
      }

      .un_available {
        width: 140px;
        height: 30px;
        padding: 10px;
        border-radius: 20px;
        line-height: 10px;
        color: light-cyan-color;
        font-size: 14px;
        background-color: #2e2b293a;
        color: @light-cyan-color;
        position: absolute;
        top: 80px;

        display: none;
      }

      .show_msg {
        display: block;
      }
    }
  }

  .options_walletbox {
    &:hover {
      background-color: rgb(240, 244, 248);
    }

    &:active {
      border: solid 1px #292422;
    }
  }

  .unOption_walletbox {
    &:hover {
      cursor: not-allowed;
    }

    &:active {
      border: solid 1px transparent;
    }
  }

  .select_network_box {
    margin-top: 3px;
    border-radius: 4px;
    padding: 20px;

    background-color: @light-cyan-color;
    display: flex;
    justify-content: space-evenly;

    .select_network {
      width: 200px;

      // span {
      //   display: inline-block;
      //   width: 10px;
      //   height: 10px;
      //   background-color: @cyan-primary-color;
      // }

      select {
        width: 200px;
        border-radius: 20px;
        border: 1px solid #131415;

        &:active {
          border-color: transparent;
        }
      }
    }
  }
}
</style>
