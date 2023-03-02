import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import CardItem from "../CardItem/CardItem";
import useBuyRequest from "../../hooks/useBuyRequest";
import useDeleteRequest from "../../hooks/useDeleteRequest";
import { FormGroup, Input, Label } from "reactstrap";
import './CardItemList.css'

const PLACEHOLDER = "...";
const TITLE = "Title";
const START_DATE = "Start Date";
const END_DATE = "End Date";

const CardItemList = ({ data, enableBuy = false, enableDelete = false }) => {
  const userType = useSelector(state => state.user.type);
  const [coupons, setCoupons] = useState([]);
  const sortByRef = useRef();

  const buyRequest = useBuyRequest();
  const deleteRequest = useDeleteRequest();

  let handleOnBuy;
  let handleOnDelete;
  let alwaysShowMoreInfo;

  if (enableBuy) {
    handleOnBuy = buyRequest;
  } else if (enableDelete) {
    handleOnDelete = deleteRequest;
    alwaysShowMoreInfo = true;
  }

  useEffect(() => {
    if (data) {
      const couponCardItems = data.map((coupon) =>
        <CardItem
          key={coupon.uuid}
          coupon={coupon}
          enableBuy={enableBuy}
          handleOnBuy={handleOnBuy}
          enableDelete={enableDelete}
          handleOnDelete={handleOnDelete}
          alwaysShowMoreInfo={alwaysShowMoreInfo}
        >
        </CardItem>
      )
      setCoupons(couponCardItems);
    }
  }, [data]);

  const handleSort = () => {
    if (sortByRef.current.value === PLACEHOLDER) {
      return;
    }

    const temp = coupons.slice();
    temp.sort(getSortingComparator(sortByRef.current.value));

    setCoupons(temp);
  }

  return (
    <div className="CardItemList">
      <FormGroup className="sort-container">
        <Label for="exampleSelect">
          Sort by
        </Label>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          onChange={handleSort}
          innerRef={sortByRef}
        >
          <option>
            {PLACEHOLDER}
          </option>
          <option>
            Title
          </option>
          <option>
            Start Date
          </option>
          <option>
            End Date
          </option>
        </Input>
      </FormGroup>

      {coupons}
    </div>
  );
}

export default CardItemList;

function getSortingComparator(sortType) {
  const comparator = (a, b) => {
    const couponA = a.props.coupon;
    const couponB = b.props.coupon;

    let x, y;
    switch (sortType) {
      case TITLE: {
        x = couponA.title.toLowerCase();
        y = couponB.title.toLowerCase();
        break;
      }
      case START_DATE: {
        x = couponA.startDate;
        y = couponB.startDate;
        break;
      }
      case END_DATE: {
        x = couponA.endDate;
        y = couponB.endDate;
        break;
      }
    }
    return compareStrings(x, y);
  }
  return comparator;
}

function compareStrings(x, y) {
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
}