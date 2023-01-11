import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { addAccount } from "../../src/firebase/UserActions";
import { useAuth } from "../../src/auth/auth";
import {
  AccountType,
  getAccountTypeArray,
} from "../../src/models/AccountModel";

export default function AddAccountModal(props: {
  isOpen: boolean;
  onClose: () => void;
  uid: string | undefined;
}) {
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [value, setValue] = useState<number | null>(null);
  // const [accountInfo, setAccountInfo] = useState({});
  const accountTypes = getAccountTypeArray();

  const { useRequiredAuth } = useAuth();
  const userData = useRequiredAuth();

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const typeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  };

  const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (name === null || type === null || value === null) {
      setError("A field is missing");
      return;
    }

    if (userData) {
      addAccount(userData.uid, userData.financialInfo.accounts, {
        name: name,
        type: type as AccountType,
        accountValue: value,
        accountInfo: {},
      });
    }

    setName(null);
    setType(null);
    setValue(null);
    setError(null);
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add an account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="account-type" isRequired>
            <FormLabel>Account Type</FormLabel>
            <Select onChange={typeHandler} placeholder="Select account type">
              {accountTypes.map((type) => {
                return (
                  <option key={type.key} value={type.key}>
                    {type.value}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl id="account-name" isRequired>
            <FormLabel>Account Name</FormLabel>
            <Input onChange={nameHandler} />
          </FormControl>
          <FormControl id="account-value" isRequired>
            <FormLabel>Account Value</FormLabel>
            <Input type="number" placeholder="$125" onChange={valueHandler} />
          </FormControl>

          {type === "SAVINGS" || type === "CHEQUINGS" ? (
            <FormControl id="account-value" isRequired>
              <FormLabel>Interest Rate (Annual %)</FormLabel>
              <Input
                type="number"
                placeholder="2.50%"
                // onChange={valueHandler}
              />
            </FormControl>
          ) : (
            <></>
          )}

          {type === "CREDITCARD" || type === "LOAN" ? (
            <>
              <FormControl isRequired>
                <FormLabel>Interest Rate</FormLabel>
                <Input
                  type="number"
                  placeholder="2.50%"
                  // onChange={valueHandler}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Minimum payment</FormLabel>
                <Input
                  type="number"
                  placeholder="$500"
                  // onChange={valueHandler}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Next Payment date</FormLabel>
                <Input type="date" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Next payment value</FormLabel>
                <Input
                  type="number"
                  placeholder="$500"
                  // onChange={valueHandler}
                />
              </FormControl>
            </>
          ) : (
            <></>
          )}

          {error !== null ? <div>Error: {error}</div> : <></>}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={submitHandler}>
            Add account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
