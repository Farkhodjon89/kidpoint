import s from '../components/CheckoutMain/checkout-main.module.scss'

export const Input = ({name, placeholder, setAction, innerRef, style}) => (
    <input
        name={name}
        placeholder={placeholder}
        onChange={e => setAction(e.target.value)}
        ref={innerRef}
        className={s.input}
    />
)

export const DeliveryInput = ({delivery, setDelivery, deliveryMethods}) =>
    deliveryMethods.map(({left, right}, i) => (
        <div key={i} onClick={() => setDelivery(left)} className={`${s.delivery} ${delivery === left ? s.active : ''}`}>
          <div>
            {delivery === left ? <img src='/public/icons/tick.svg' alt=''/> :
                <img src='/public/icons/untick.svg' alt=''/>} {left}
          </div>
          <div> {right} </div>
        </div>
    ))

export const PaymentInput = ({selectMethod, setSelectMethod, otherPayment}) => {

  return (
      otherPayment.map((r, i) => (
          <div key={i} onClick={() => setSelectMethod(r.value)}
               className={`${s.payment} ${selectMethod === r.value ? s.active : ''}`}>
            {selectMethod === r.value ? <img src='/public/icons/tick.svg' alt=''/> :
                <img src='/public/icons/untick.svg' alt=''/>}
            {r.name}
            <img src={r.img} alt=''/>
          </div>
      ))
  )

}
export const CashInput = ({selectMethod, setSelectMethod, cashPayment}) => {

  return (
      cashPayment.map((r, i) => (
          <div key={i} onClick={() => setSelectMethod(r.value)}
               className={`${s.cashPayment} ${selectMethod === r.value ? s.active : ''}`}>
            {selectMethod === r.value ? <img src='/public/icons/tick.svg' alt=''/> :
                <img src='/public/icons/untick.svg' alt=''/>}
            {r.name}
            <img src={r.img} alt=''/>
          </div>
      ))
  )

}


export const Textarea = ({setComment}) => (
    <textarea placeholder='Комментарии (необязательно)' className={s.textArea}
              onChange={e => setComment(e.target.value)}/>
)
