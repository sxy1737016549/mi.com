import './library/jquery.js';
import './library/jquery-1.11.0.min.js';
import './library/jquery.lazyload.js';
import {cookie} from './library/cookie.js'


let id = location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function(res) {

        let picture = JSON.parse(res.picture);

        let tradename=JSON.parse(res.tradename);
        
        let productcontent=JSON.parse(res.productcontent);

        let temp=`
        <h2>${tradename[0].name}</h2>
        <div class="con">
            <div class="left">
                <span class="separator">|</span>
                <a href="">Redmi Note 9 Pro 5G</a>
                <span class="separator">|</span>
                <a href="">Redmi Note 9 4G</a>
            </div>
            <div class="right">
                <a href="">概述页</a>
                <span class="separator">|</span>
                <a href="">参数页</a>
                <span class="separator">|</span>
                <a href="">F码通道</a>
                <span class="separator">|</span>
                <a href="">咨询客服</a>
                <span class="separator">|</span>
                <a href="">用户评价</a>
            </div>
        </div>
        `;
        $('#shopname').append(temp);



        let temp2=`
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" ><img src="../${picture[1].src}" alt=""></div>
            </div>
            <!-- Add Arrows -->
            <div class="swiper-button-next swiper-button-white"></div>
            <div class="swiper-button-prev swiper-button-white"></div>
        </div>
        `;
        $('.img-left').append(temp2);


        let temp3=`
            ${productcontent[0].content}
        `;
        $('.sale-desc').append(temp3);


        let temp4=`
            ${res.price}元
        `;
        $('.temp4').append(temp4);

        let temp5=`
            ${tradename[0].name}
        `;
        $('.temp5').append(temp5);

        let temp6=`
        总计：${res.price}元        
        `;
        $('.total-price').append(temp6);

        let color = JSON.parse(res.color);

        color.forEach((elm,i)=>{
            let temp7='';
            
            temp7 =`
            <div>
                <a>${color[i].col}</a>
             </div>
            `
            $('.phone_color').append(temp7)
        });
        
        let temp8=`
        <a href="./shop-trolley.html" class="btn btn-primary" id="addItem">加入购物车</a>
        `

        $('.sale-btn').append(temp8).find('#addItem').on('click',function(){
            addItem(res.id,res.price);
        });
    }
    
});

function addItem(id,price){
    let shopp=cookie.get('shopp');

    let product={
        id:id,
        price:price
    };
    if (shopp) { // 判断购物车是否有添加过数据
        shopp = JSON.parse(shopp); //将JSON字符串转回数组

        // 判断购物车中是否存在该商品
        if (shopp.some(elm => elm.id == id)) {
            shopp.forEach(el => {
                el.id == id ? el.num = num : null;
            });
        } else {
            shopp.push(product);
        }

    } else {
        shopp = []; // 初始没有数据 初始化一个空数组
        shopp.push(product); // 将第一个商品添加进数组
    }
 
    cookie.set('shopp',JSON.stringify(shopp),1);
}



$(function () {
    $("img.lazy").lazyload({ effect: "fadeIn" });
});