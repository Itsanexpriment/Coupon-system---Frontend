import { useRef } from "react";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import './CreateCoupon.css'
import { errorToast, successToast } from "../../toast/toast"


const errorMessageMap = (errorInfo) => {
  let msg = "Can't create coupon, "

  if (errorInfo.includes("name")) {
    msg += "name is invalid";
  }
  else if (errorInfo.includes("description")) {
    msg += "description is invalid";
  }
  else if (errorInfo.includes("price")) {
    msg += "price can't be lower than 1";
  } else if (errorInfo.includes("amount")) {
    msg += "amount can't be less than 1";
  }
  return msg;
}

const CreateCoupon = () => {
  const postNewCoupon = usePrivateRequest(
    "/company/create-coupon",
    "post",
    (__) => successToast("Coupon created :)"),
    (err) => {
      if (err?.response) {
        if (err.response.status === 400) {
          errorToast(errorMessageMap(err.response.data.detail))
        } else {
          errorToast("A server error has occured, try again later");
        }
      }
    }
  );

  const titleRef = useRef();
  const imageUrlRef = useRef();
  const priceRef = useRef();
  const amountRef = useRef();
  const categoryRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const descriptionRef = useRef();

  const handleCreate = () => {
    const coupon = {
      title: titleRef.current.value,
      imageUrl: imageUrlRef.current.value,
      price: priceRef.current.value,
      amount: amountRef.current.value,
      category:categoryRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      description: descriptionRef.current.value,
    }
    postNewCoupon(coupon);
  }


  return (
    <div className="CreateCoupon">
      <h1 className="create-header">Create your very own coupon</h1>

      <button onClick={handleCreate}>Create Coupon</button>

      <Form className="create-coupon-form">
        <FormGroup>
          <Label for="title">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            innerRef={titleRef}
          />
        </FormGroup>
        <FormGroup>
          <Label for="imageUrl">
            Image Url/Link
          </Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            placeholder="https://example.com"
            type="url"
            innerRef={imageUrlRef}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">
            Price (in USD)
          </Label>
          <Input
            id="price"
            name="price"
            defaultValue={500}
            type="number"
            innerRef={priceRef}
          />
        </FormGroup>
        <FormGroup>
          <Label for="amount">
            Amount
          </Label>
          <Input
            id="amount"
            name="amount"
            defaultValue={100}
            type="number"
            innerRef={amountRef}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">
            Category
          </Label>
          <Input
            id="category"
            name="category"
            type="select"
            innerRef={categoryRef}
          >
            <option>
              1
            </option>
            <option>
              2
            </option>
            <option>
              3
            </option>
            <option>
              4
            </option>
            <option>
              5
            </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="startDate">
            Start Date
          </Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue="2023-04-01"
            innerRef={startDateRef}
          />
        </FormGroup>
        <FormGroup>
          <Label for="endDate">
            Expiration Date
          </Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue="2025-04-01"
            innerRef={endDateRef}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            type="textarea"
            style={{ width: "400px", height: "100px", marginBottom: "2rem" }}
            placeholder="“Why waste time say lot word when few word do trick” -Kevin Malone"
            innerRef={descriptionRef}
          />
        </FormGroup>
      </Form>
    </div>
  );
}

export default CreateCoupon;