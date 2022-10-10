// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract perevodi{
    struct users{
        address login;
        bytes32 password;
        uint role; // роли: 0 - администратор, 1 - рядовой пользователь
    }

    struct sample{
        uint category_id;
        string name_sample;
        uint sum;
    }

    struct categories{
        string name_category;
    }

    struct transact{
        address sender;
        address resipient;
        uint sum;
        uint category;
        bool safe_transact; // перменная, для обзначения безопасный ли перевод
        bool admin_answer; // решения администратора о безопасном переводе
        bytes32 code_word; // кодовое слово
        uint256 date_send; // дата отправвки
        uint256 date_accept; // дата принятия
        bool end; // завершение транзакции
        uint ateps;
    }

    struct vote{
        uint idVote;
        address candidate;
        bool idClosed;
        uint countOfVoted;
    }

    uint countAdmins = 0;

    users[] Users;
    categories[] Categories;
    transact[] Transact;
    sample[] samples;
    vote[] Votes;


    constructor(){
        Users.push(users(0xB90A484F4371f6214c106152c045c9dA4814771c, keccak256(abi.encodePacked("1234")), 0)); 
        Users.push(users(0xF1eeE9D440984116cAfd38dB88E2025CF02DA327, keccak256(abi.encodePacked("4321")), 0));

        countAdmins+=2;

        Users.push(users(0x0e143633E27Dd6E62D2471D72ccfCbac1FF3E3a9, keccak256(abi.encodePacked("mom")), 1));
        Users.push(users(0x8D971e743d93d8E38b009cb13277A13Ee7F61019, keccak256(abi.encodePacked("dad")), 1));
        Users.push(users(0xc7842FEb4596e227Dc94424752049Ba1AE1555cE, keccak256(abi.encodePacked("son")), 1));
        Users.push(users(0xA705D6fCf996D2ad1A606c38CBb6d3C949E78D94, keccak256(abi.encodePacked("sister")), 1));


        Categories.push(categories("Personal transfer"));
        samples.push(sample(0, "Gift", 1));
        samples.push(sample(0, "Gift", 3));
        samples.push(sample(0, "Gift", 5));

        Categories.push(categories("Payment of rent"));
        samples.push(sample(1, "Rent", 7));
        samples.push(sample(1, "Rent", 9));

        Categories.push(categories("Personal settlements"));
        samples.push(sample(2, "Debt repayment", 0));
    }

    function people_transfer(address recipient, uint sum, uint category, bool safe_transact, bytes32 code_word) public payable{ //на интерфейсе проверка на сумму перевода больше 0
        require(msg.value >= sum);
        require(msg.sender != recipient);
        Transact.push(transact(msg.sender, recipient, msg.value, category, safe_transact, false, code_word, block.timestamp, 0, false, 0));
    }

    function accept_resipient(uint id, bytes32 code_word) public payable {
        Transact[id].ateps++;
        require(Transact[id].resipient == msg.sender, "You are not resipient");
        require(Transact[id].end != true);
        if (code_word == Transact[id].code_word) {
            require(Transact[id].ateps <= 2);
            if (Transact[id].safe_transact == true){
                require(Transact[id].admin_answer == true, "the admin did not confirm the secure transaction");
                payable(Transact[id].resipient).transfer(Transact[id].sum);
                Transact[id].end = true;
            }
            else{
                payable(Transact[id].resipient).transfer(Transact[id].sum);
                Transact[id].end = true;
            }
        }
        else {
            require(Transact[id].ateps >= 3);
            payable(Transact[id].sender).transfer(Transact[id].sum);
            Transact[id].end = true;
        }
    }

    function cancel_transfer(uint id) public payable { //на интерфейсе проверка на вызов отправителем денег
        require(Transact[id].sender == msg.sender, "You are not sender");

        payable(Transact[id].sender).transfer(Transact[id].sum);
        Transact[id].end = true;
    }

    function transfer_template(address recipient, uint id_sample, bytes32 code_word, bool safe_transact) public payable{ // проверка на существование шаблона будет на интерфейсе
        require(msg.value == samples[id_sample].sum, "uncorrected transfer amount");
        require(msg.sender == recipient);
        Transact.push(transact(msg.sender, recipient, msg.value, samples[id_sample].category_id, safe_transact, false, code_word, block.timestamp, 0, false, 0));
    }


    function check_safe_transact(uint idTransact, uint idUser, bool answer) public payable{
        require(Users[idUser].role == 0, "You are not admin");
        if (Transact[idTransact].safe_transact == true){
            if (answer == true){
                Transact[idTransact].admin_answer = answer;
            }
            else{
                payable(Transact[idTransact].sender).transfer(Transact[idTransact].sum);
                Transact[idTransact].end = true;
            }
        }
    }

    function add_new_categori(uint idUser, string memory new_category) public{
        require(Users[idUser].role == 0, "You are not admin");
        Categories.push(categories(new_category));
    }

    modifier isAdmin(address candidate){
        for(uint i = 0; i<Users.length; i++) {
            if (Users[i].login == candidate) {
                require(Users[i].role == 0, "U are not admin");
                break;
            }
        }
        _;
    }

    modifier isNotAdmin(address candidate){
        for(uint i = 0; i<Users.length; i++) {
            if (Users[i].login == candidate) {
                require(Users[i].role != 0, "U are admin");
                break;
            }
        }
        _;
    }

    function add_new_admin(address candidate) public isNotAdmin(candidate) isAdmin(msg.sender) {
        Votes.push(vote(Votes.length, candidate, false, 1));
    }

    function add_vote(uint id, bool voteOfMan) public isAdmin(msg.sender){
        require(Votes[id].idClosed!=true, "It's closed");
        Votes[id].countOfVoted+=1;
        if(voteOfMan){
            if(Votes[id].countOfVoted == countAdmins){
                for(uint i = 0; i<Users.length; i++) {
                    if (Users[i].login == Votes[id].candidate) {
                        Users[i].role = 0;
                        break;
                    }
                    Votes[id].idClosed=true;
                }
            }
        }
        else{
            Votes[id].idClosed=true;
        }
    }

    function register(address login, bytes32 password) public returns(uint){
        Users.push(users(login, password, 1));
        return(0);
    }

    function view_users() public view returns(users[] memory){
        return(Users);
    }
}

