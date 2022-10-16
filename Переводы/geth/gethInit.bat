cd ./
timeout /t 10
start geth --datadir ./ --networkid 1547 --http --http.corsdomain "*" --allow-insecure-unlock --http --http.api personal,eth,net,web3
start http://localhost:80
geth attach --exec miner.start(1)
geth attach