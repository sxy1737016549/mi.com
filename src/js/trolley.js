import './library/jquery.js';
import './library/jquery-1.11.0.min.js';
import './library/jquery.lazyload.js';
import { cookie } from './library/cookie.js';

let shop = cookie.get('shopp');

if (shop) {
    shop = JSON.parse(shop);// 有cookie数据才需要转换
    // console.log(shop);
    let idList = shop.map(elm => elm.id).join();//获得所有id

    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data: {
            idList: idList
        },
        dataType: "json",
        success: function (res) {
            console.log(res)
            let temp = '';
            res.forEach((elm, i) => {

                let picture = JSON.parse(elm.picture);


                let arr = shop.filter(val => val.id == elm.id);

                // console.log(elm.num)


                temp += `
            <div class="item-row clearfix">
                <div class="col col-check">
                    <input type="checkbox" class="sel" id="${elm.id}">
                </div>
                <div class="col col-img">
                    <a href="./shop.html">
                        <img src="../${picture[1].src}" alt="" width="80" height="80">
                    </a>
                </div>
                <div class="col col-name">
                    <h3 class="name">
                        <a href="">${elm.sequence}</a>
                    </h3>
                </div>
                <div class="col col-price" id="price" name="${elm.id}">
                    ${elm.price}元
                </div>
                <div class="col col-num">
                    <div class="change-goods-num clearfix">
                        <a style="cursor: pointer;" class="reduce" name="${elm.id}">
                            -
                        </a>
                        <input type="text" class="goods-num" autocomplete="off" value="1" min="1" max="${elm.num}" id="${elm.id}" name="${elm.id}">
                        <a style="cursor: pointer;" class="increase" name="${elm.id}">
                            +
                        </a>
                    </div>
                </div>
                <div class="col col-total col-total-1" id="${elm.id}" name="${elm.id}">
                    ${elm.price}元
                </div>
                <div class="col col-action">
                    <a href="javascript:;" class="del" style="cursor: pointer;" data-id="${elm.id}">
                        ✖
                    </a>
                </div>
            </div>
                `
            });
            $('.item-table').append(temp).find('.del').on('click', function () {
                let shop2 = shop.filter(el => el.id != $(this).attr('data-id'));

                console.log(shop2);

                cookie.set('shopp', JSON.stringify(shop2), 1);//商品详情页获取的cookie

                location.reload();
            });


            let temp2 = `
            合计：
            <em id="heji">0</em>
            元
            <a class="btn btn-a btn-primary" id="btn-primary">去结算</a>
            `;
            $('.total-price').append(temp2);


            $('.increase').on('click', function (e) {
                let zj = e.target.getAttribute('name');

                // console.log(zj)

                let num2 = e.target.previousSibling.previousSibling;

                let pric = num2.parentNode.parentNode.nextElementSibling;

                let danjia = num2.parentNode.parentNode.previousSibling.previousSibling;

                // console.log(danjia)

                let heji = num2.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.children[1].children[0];

                if (pric.id = zj) {

                    num2.value = parseInt(num2.value) + 1;
                    pric.innerHTML = num2.value * parseInt(danjia.textContent) + `元`;

                }
                let newpric = document.getElementsByClassName('col-total-1');


                let newspric = [...newpric];

                let sum = 0;
                newspric.forEach((elm, i) => {

                    // console.log(newspric[i]);

                    sum += parseInt(newspric[i].textContent);

                    // console.log(sum);

                })

                heji.innerHTML = sum;


            });
            $('.reduce').on('click', function (el) {
                let jianshao = el.target.getAttribute('name');

                let num2 = el.target.nextElementSibling;

                let pric = num2.parentNode.parentNode.nextElementSibling;

                let danjia = num2.parentNode.parentNode.previousSibling.previousSibling;

                // console.log(danjia)

                let heji = num2.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.children[1].children[0];

                if (pric.id = jianshao) {

                    num2.value = parseInt(num2.value) - 1;

                    pric.innerHTML = num2.value * parseInt(danjia.textContent) + `元`;


                }
                let newpric = document.getElementsByClassName('col-total-1');

                let newspric = [...newpric];

                let sum = parseInt(heji.textContent);
                newspric.forEach((elm, i) => {

                    // console.log(newspric[i]);

                    heji.innerHTML = sum - parseInt(danjia.textContent) * 1;

                })

                if (num2.value - 1 < 1) {
                    num2.value = 1;
                    alert('不允许数量小于一');

                    pric.innerHTML = parseInt(danjia.textContent) * 1 + `元`;
                    // let sum2=parseInt(heji.textContent);

                    // console.log(sum2)
                    // sum2=(parseInt(danjia.textContent)*1)
                    // let sum2 = parseInt(danjia.textContent) * 1
                    // heji.innerHTML += sum2
                    // console.log(sum2)
                    let newspric = [...newpric]

                    let sum = 0;
                    newspric.forEach((elm, i) => {

                        // console.log(newspric[i]);

                        sum += parseInt(newspric[i].textContent);

                        // console.log(sum);

                    })

                    heji.innerHTML = sum;

                }
            });
            $('.total-chec').on('click', function (elm) {
                if ($(this).prop('checked')) {
                    $(".sel").prop("checked", true);
                    let newpric = document.getElementsByClassName('col-total-1');


                    let newspric = [...newpric];

                    let sum = 0;
                    newspric.forEach((elm, i) => {

                        sum += parseInt(newspric[i].textContent);

                    });

                    heji.innerHTML = sum;

                } else {
                    $(".sel").prop("checked", false);
                    heji.innerHTML = '0';

                }
            })
            $('.sel').on('click',function(elm){
            //    console.log(elm)
                if(this.checked){

                    let heji=document.getElementById('heji');

                    let sum=parseInt(heji.textContent);

                    // console.log(sum)

                    let sun=this.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;

                    sum+=parseInt(sun.textContent);
                    console.log(sum);

                    heji.innerHTML=sum;

                }else{
                    let heji=document.getElementById('heji');

                    let sum=parseInt(heji.textContent);

                    let sun=this.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;

                    sum-=parseInt(sun.textContent);

                    heji.innerHTML=sum;
                }
            });
            $('#btn-primary').on('click',function(){
                let ful=document.getElementById('heji');
                let nul=document.getElementById('container-main');
                if(parseInt(ful.textContent)!=0){
                    alert('购买成功');
                    nul.textContent=null;
                    
                }else{
                    alert('请选择需要购买的物品');
                }
                
            })
            
        }


    });





}