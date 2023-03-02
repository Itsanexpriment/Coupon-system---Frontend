import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useState, useMemo } from 'react';
import './CouponsDropdown.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CouponsDropdown = () => {
  const userType = useSelector(state => state.user.type);
  const naviagate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const dropdownItems = useMemo(() => {
    if (userType === "customer") {
      return (
        <>
          <DropdownItem onClick={() => { naviagate("/my-coupons") }}>View my coupons</DropdownItem>
          <DropdownItem onClick={() => { naviagate("/shop") }}>Shop </DropdownItem>
          <DropdownItem onClick={() => { naviagate("/expiring-soon") }}>Expiring soon</DropdownItem>
        </>
      )
    } else if (userType === "company") {
      return (
        <>
          <DropdownItem onClick={() => { naviagate("/my-coupons") }}>View my coupons</DropdownItem>
          <DropdownItem onClick={() => { naviagate("/create-coupon") }}>Create coupon</DropdownItem>
        </>
      )
    }
  }, [userType])

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>My Coupons</DropdownToggle>
      <DropdownMenu children={dropdownItems}>
      </DropdownMenu>
    </Dropdown>
  );
}

export default CouponsDropdown;