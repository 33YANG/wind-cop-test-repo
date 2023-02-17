import { useState } from 'react'
import { ProductCard } from './components/ProductCard'
import { productData } from './data.json'
import './assets/App.less'

function App() {
  // 购物车数据
  const [cartData, setCartData] = useState<Map<string, Types.CartInfo>>(new Map())
  // 添加购物车数据
  const handleAddCartData = (data: Types.ProductType) => {
    const { key, price, label } = data
    const count = cartData.get(key)?.count || 0
    cartData.set(key, { price, label, count: count + 1 })
    setCartData(new Map(cartData))
  }
  // 删除购物车数据
  const handleRemoveCartData = (key: string) => {
    cartData.delete(key)
    setCartData(new Map(cartData))
  }
  // 购买
  const handleBuy = () => {
    // calculate total price
    let totalPrice = 0
    cartData.forEach(value => {
      totalPrice += value.price * value.count
    })
    // 保留两位小数，JS中的浮点数计算会有精度问题
    totalPrice = Math.round(totalPrice * 100) / 100
    console.log('totalPrice', totalPrice)
    alert(
      '购买成功! 其中包含: ' +
        Array.from(cartData)
          .map(([key, value]) => `${value.label} * ${value.count}`)
          .join(', ') +
        '；总价为: ' +
        totalPrice +
        '元。'
    )
    setCartData(new Map())
  }

  return (
    <>
      <main>
        <section className="header">
          <h1 className="title">购物天堂</h1>
          <div className="cart">
            <button className="cart-button">{`购物车${
              cartData.size > 0 ? ' * ' + [...cartData.values()].reduce((acc, cur) => acc + cur.count, 0) : ''
            }`}</button>
            <div className="hover-content">
              {cartData.size < 1 ? (
                <div className="empty-cart">购物车空空如也</div>
              ) : (
                Array.from(cartData).map(([key, value]) => (
                  <div className="cart-item" key={key}>
                    <div className="cart-item-label">{value.label}</div>
                    <div className="right-info">
                      <span className="cart-item-price">{`${value.price} * ${value.count}`}</span>
                      <button className="normal-button" onClick={() => handleRemoveCartData(key)}>
                        删除
                      </button>
                    </div>
                  </div>
                ))
              )}
              <button disabled={cartData.size === 0} className="cart-button buy-button" onClick={handleBuy}>
                购买
              </button>
            </div>
          </div>
        </section>
        <section className="product">
          {productData.map(item => (
            <ProductCard data={item} key={item.key} addCartData={handleAddCartData} />
          ))}
        </section>
      </main>
    </>
  )
}

export default App
