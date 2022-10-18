start geth --datadir ./ --networkid 1547 --http --http.corsdomain "*" --allow-insecure-unlock --http --http.api personal,eth,net,web3
cd ../../../
"C:\OpenServer\Open Server.exe" /start
"C:\Program Files\Google\Chrome\Application\chrome.exe" http://block:80
timeout /t 10
cd C:\OpenServer\domains\block\geth
geth attach \\.\pipe\geth.ipc --exec miner.start(1)
geth attach \\.\pipe\geth.ipc