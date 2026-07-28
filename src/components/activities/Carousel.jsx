import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function CarouselItem({ item }) {
  return (
    <div className="flex flex-col h-full">
      {item.image && (
        <div className="relative overflow-hidden rounded-xl mb-4" style={{ paddingBottom: '56.25%' }}>
          <img
            src={item.image}
            alt={item.title || ''}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {item.badge && (
            <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-title font-semibold px-3 py-1 rounded-full">
              {item.badge}
            </span>
          )}
        </div>
      )}
      {!item.image && item.icon && (
        <div className="flex items-center justify-center h-36 rounded-xl mb-4 gradient-primary">
          <span className="text-6xl">{item.icon}</span>
        </div>
      )}
      {item.title && (
        <h3 className="font-title text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
      )}
      {item.content && (
        <p className="font-body text-sm text-gray-600 leading-relaxed">{item.content}</p>
      )}
    </div>
  )
}

export default function Carousel({ block }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      {block.title && (
        <h2 className="font-title text-2xl font-semibold text-gray-800 mb-6">{block.title}</h2>
      )}
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: block.perView || 3 },
        }}
        className="pb-10"
      >
        {block.items.map((item, i) => (
          <SwiperSlide key={i}>
            <CarouselItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
