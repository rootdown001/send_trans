const { Console } = require('console');
const Web3 = require('web3');
const MyContract = require('./build/contracts/MyContract.json');

const init = async () => {
    const web3 = new Web3('http://127.0.0.1:8545');
 
    const id = await web3.eth.net.getId();
    
    const deployedNetwork = MyContract.networks[id];
    
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );
    
    // console.log(contract);
    const addresses = await web3.eth.getAccounts();
    // console.log(addresses);

    const receipt = await contract.methods.setData(30).send({
        from: addresses[0]
    });
    const data = await contract.methods.getData().call();
    console.log(data);
    // console.log(receipt);

} 

init();