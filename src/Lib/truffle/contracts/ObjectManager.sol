pragma solidity ^0.4.17;

contract owned {
    address public owner;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function owned() public {
        owner = msg.sender;
    }

    function transferOwnership(address newOwner) onlyOwner external {
        owner = newOwner;
    }
}


contract Object {
    address public objectManager;
    address public owner;
    bytes32 public identifier;

    function Object(address _owner, bytes32 _identifier) public {
        objectManager = msg.sender;
        owner = _owner;
        identifier = _identifier;
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == objectManager);
        require(tx.origin == owner);

        owner = newOwner;
    }
}


contract ObjectManager is owned {
    mapping (address => bool) public verifiers;

    mapping (address => mapping (uint => bytes32)) public objectOwners;
    mapping (address => uint) public objectOwnersIndex;
    mapping (bytes32 => Object) public objects;

    modifier onlyVerifier() {
        require(verifiers[msg.sender]);
        _;
    }

    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event ObjectCreated(address indexed verifier, address indexed owner, bytes32 identifier, address object);
    event ObjectTransferred(bytes32 indexed object, address indexed from, address indexed to);

    function ObjectManager() public {
        verifiers[msg.sender] = true;
    }

    function addVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = true;

        VerifierAdded(_verifier);
    }

    function removeVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = false;

        VerifierRemoved(_verifier);
    }

    function registerObject(bytes32 _identifier, address _owner) external onlyVerifier {
        require(objects[_identifier] == address(0));

        Object object = new Object(_owner, _identifier);

        objectOwners[_owner][objectOwnersIndex[_owner]] = _identifier;
        objectOwnersIndex[_owner]++;
        objects[_identifier] = object;

        ObjectCreated(msg.sender, _owner, _identifier, object);
    }

    function transferObject(bytes32 _identifier, address _newOwner) external {
        require(objects[_identifier] != address(0));

        Object object = objects[_identifier];

        require(object.owner() == msg.sender);
        require(object.objectManager() == address(this));

        object.transferOwnership(_newOwner);

        ObjectTransferred(_identifier, msg.sender, _newOwner);

        // update object registry
        // assign new owner
        objectOwners[_newOwner][objectOwnersIndex[_newOwner]] = _identifier;
        objectOwnersIndex[_newOwner]++;

        // remove old owner
        for (uint i = 0; i < objectOwnersIndex[msg.sender]; i++) {
            if (objectOwners[msg.sender][i] == _identifier) {
                objectOwners[msg.sender][i] = objectOwners[msg.sender][objectOwnersIndex[msg.sender] - 1];
                delete objectOwners[msg.sender][objectOwnersIndex[msg.sender] - 1];
                objectOwnersIndex[msg.sender]--;
                break;
            }
        }
    }
}
