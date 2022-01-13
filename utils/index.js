export const getPrice = (product) => {
  const normalPrice = product.woocsRegularPrice;
  const salePrice = product.woocsSalePrice;
  return {
    normalPrice,
    salePrice,
  };
};

export const addZero = number =>
  String(number).length === 1 ? `0${number}` : String(number)

export const formatDate = date => {
  const day = addZero(date.getDate())
  const month = addZero(date.getMonth() + 1)
  const year = date.getFullYear()

  return [day, month, year].join('.')
}

export const getFormat = (
  number,
  floatingDigits = 0,
  splitBy = 3,
  splitter = " ",
  floatingSplitter = "."
) => {
  const re = `\\d(?=(\\d{${splitBy}})+${floatingDigits > 0 ? "\\D" : "$"})`;
  const num = (typeof number === "number" ? number : parseInt(number)).toFixed(
    Math.max(0, ~~floatingDigits)
  );

  return (floatingSplitter ? num.replace(".", floatingSplitter) : num).replace(
    new RegExp(re, "g"),
    `$&${splitter}`
  );
};

export const getDiscount = (normalPrice, salePrice) =>
  Math.round(
    ((parseInt(normalPrice) - parseInt(salePrice)) * 100) /
      parseInt(normalPrice)
  );

export const chunk = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};


export const formatOrder = order => {
  const statusesMap = {
    CANCELLED: 'Отменен',
    COMPLETED: 'Выполнен',
    COURIER: 'Передан курьеру',
    FAILED: 'Не удался',
    ON_HOLD: 'На удержании',
    PAID: 'Оплачено',
    PENDING: 'В ожидании оплаты',
    PROCESS: 'В обработке',
    PROCESSING: 'Обрабатывается',
    REFUNDED: 'Возвращен'
  }

  order.total = order.total.replace('&nbsp;UZS', '').replace(' ', '')

  return {
    id: order.databaseId,
    date: formatDate(new Date(order.date.replace('+00:00', '+05:00'))),
    total: order.total,
    status: statusesMap[order.status.toUpperCase()] || order.status,
    lineItems: (order.lineItems && order.lineItems.nodes) || [],
    payment: order.paymentMethodTitle,
    subtotal: order.subtotal && formatPrice(reformatPrice(order.subtotal)),
    shippingTotal:
      order.shippingTotal && formatPrice(reformatPrice(order.shippingTotal)),
    firstName: order.billing && order.billing.firstName,
    phone: order.billing && order.billing.phone,
    address: order.billing && order.billing.address1,
    customerNote: order.customerNote
  }
}