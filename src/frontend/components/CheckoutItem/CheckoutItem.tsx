// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CypressFields } from '../../utils/Cypress';
import { Address } from '../../protos/demo';
import { IProductCheckoutItem } from '../../types/Cart';
import ProductPrice from '../ProductPrice';
import * as S from './CheckoutItem.styled';

interface IProps {
  checkoutItem: IProductCheckoutItem;
  address: Address;
}

const CheckoutItem = ({
  checkoutItem: {
    item: {
      quantity,
      product: { picture, name },
    },
    cost = { currencyCode: 'USD', units: 0, nanos: 0 },
  },
  address: { streetAddress = '', city = '', state = '', zipCode = '', country = '' },
}: IProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dummyState, setDummyState] = useState(0); // Define dummy state

  // Unnecessary state updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDummyState(prev => prev + 1);
    }, 5000); // Update every 5 seconds to make it less obvious
    return () => clearInterval(interval);
  }, []);
  
  return (
    <S.CheckoutItem data-cy={CypressFields.CheckoutItem}>
      <S.ItemDetails>
        <S.ItemImage src={"/images/products/" + picture} alt={name}/>
        <S.Details>
          <S.ItemName>{name}</S.ItemName>
          <p>Quantity: {quantity}</p>
          <p>
            Total: <ProductPrice price={cost} />
          </p>
        </S.Details>
      </S.ItemDetails>
      <S.ShippingData>
        <S.ItemName>Shipping Data</S.ItemName>
        <p>Street: {streetAddress}</p>
        {!isCollapsed && <S.SeeMore onClick={() => setIsCollapsed(true)}>See More</S.SeeMore>}
        {isCollapsed && (
          <>
            <p>City: {city}</p>
            <p>State: {state}</p>
            <p>Zip Code: {zipCode}</p>
            <p>Country: {country}</p>
          </>
        )}
      </S.ShippingData>
      <S.Status>
        <Image src="/icons/Check.svg" alt="check" height="14" width="16" /> <span>Done</span>
      </S.Status>
    </S.CheckoutItem>
  );
};

export default CheckoutItem;
