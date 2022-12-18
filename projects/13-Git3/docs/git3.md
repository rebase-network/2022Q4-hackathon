
## How

We wrote a git plugin and a git3 command line tool to make git work with git3 protocal. After install the tool, you should have `git-remote-git3` and `git3` in your `/usr/local/bin` folder can can access those two commands in your terminal.

`git3` command is used to manage wallets, create repo and some other management works, `git-remote-git3` is the internal program that we use to connect with git, you should not use it directly.

We use `eth storage w3q` network to do this demo in hackathon, and we also trying to make it work with other blockchains in the future.

Take a look at the demo screenshots to see how to use git3.

## Demo

## Step 1 - Create Wallet

`git3 help` shows the commands provided, you may need `new` or `import` to generate your first wallet

![git3_help](https://raw.githubusercontent.com/cyhhao/2022Q4-hackathon/main/projects/13-Git3/docs/git3_help.png)

`git3 new` will ask you to generate wallet based on mnemonic or private key

![git3_new](https://raw.githubusercontent.com/cyhhao/2022Q4-hackathon/main/projects/13-Git3/docs/git3_new.png)


## Step 2 - Create Repo

you need to create your repo use `git3 create default [repo_name]`, now the repo owner has access to push and anyone can pull or clone as all repos is public onchain. Make sure you have some test coins in your address.


![create_repo](https://raw.githubusercontent.com/cyhhao/2022Q4-hackathon/main/projects/13-Git3/docs/create_repo.png)

## Step 3 - Add Code

Initilize a repo and do a simple commit, the add remote with git3 protocal like `git remote add origin git3://[repo_name]`

![init_repo](https://raw.githubusercontent.com/cyhhao/2022Q4-hackathon/main/projects/13-Git3/docs/init_repo.png)

## Step 4 - Push Remote

Push repo like you always do, the git objects and informations will be fully write on w3q blockchain.

![push_repo](https://raw.githubusercontent.com/cyhhao/2022Q4-hackathon/main/projects/13-Git3/docs/push_repo.png)

## Step 5 - Clone 

Clone the remote url somewhere else just like you always do.

![clone_repo](https://raw.githubusercontent.com/cyhhao/2022Q4-hackathon/main/projects/13-Git3/docs/clone_repo.png)
