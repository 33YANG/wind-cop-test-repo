// 统一默认使用Fruit图片
import Fruit from '../assets/fruit.jpeg'

/**
 * 商品卡片组件
 * @param props 商品卡片组件的props
 */
export function ProductCard(props: Types.ProductCardProps) {
  const { label, price } = props.data
  const { addCartData } = props

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={Fruit} alt={label} />
      </div>
      <div className="info">
        <div className="name" title={label}>
          {label}
        </div>
        <div className="right-info">
          <span className="price">{price}</span>
          <button className="normal-button" onClick={() => addCartData(props.data)}>
            加入购物车
          </button>
        </div>
      </div>
    </div>
  )
}
