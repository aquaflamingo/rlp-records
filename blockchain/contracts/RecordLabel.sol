import "@openzeppelin/contracts/access/Ownable.sol";

contract RecordLabel Ownable {
    mapping(address => bool) private _members;

    string private _name;
    uint256 private _royalty;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function addMember(address memory addr) public returns(bool memory) {
      // TODO
    }
}
