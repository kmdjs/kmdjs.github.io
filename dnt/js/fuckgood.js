var json_2013_0519=
    [
    {
        "javascript": [
            {
                "q": "怎么通过javascript直接把 <p> 元素写到 HTML 文档输出中？",
                "a": "使用document.write('<p>My First JavaScript</p>');"
            },
            {
                "q": "javascript单行注释怎么写？",
                "a": "两个斜杠：//"
            },
            {
                "q": "javascript是面向对象的，怎么体现javascript的继承关系？",
                "a": "使用prototype来实现,把子对象原型prototype指向父对象的实例，这样子的话，子元素就可以通过原型链_proto_找到父元素的方法和属性。"
            },
            {
                "q": "什么是闭包？",
                "a": "当函数内部定义了一个函数，内部的函数访问外部函数的本地变量，这个时候形成一个闭包。"
            },
            {
                "q": "闭包的作用？",
                "a": "隔离作用域,保存上下文环境信息。"
            },
            {
                "q": "闭包的陷阱？",
                "a": "for循环中的闭包使用循环的index，总是使用index最后的值。解决这个陷阱需要执行一个函数传递进去，然后把内部函数return出来。"
            },
            {
                "q": "写什么脚本可以使点击指向qq.com的a标签不发生任何事情？",
                "a": "阻止它的默认事件，event.preventDefault()；兼容老版本IE  event.returnValue=false;"
            },
            {
                "q": "javascript反转数组？",
                "a": "reverse方法"
            },
            {
                "q": "javascript string的替换函数？",
                "a": "replace方法"
            },
            {
                "q": "冒泡的机制？",
                "a": "当一个元素上的事件被触发的时候，比如说鼠标点击了一个按钮，同样的事件将会在那个元素的所有祖先元素中被触发。这一过程被称为事件冒泡；这个事件从原始元素开始一直冒泡到DOM树的最上层。"
            },
            {
                "q": "怎么阻止冒泡？",
                "a": "event.stopPropagation(),老版本IE event.cancelBubble()。"
            },
            {
                "q": "数据通讯格式使用JSON的优势？",
                "a": "轻量级，javascript天生支持。"
            },
            {
                "q":"怎么对象转化成JSON字符串？",
                "a": "JSON.stringify"
            },
            {
                "q": "JSON字符串转化成JSON对象？",
                "a": "eval '(' + strJson + ')'或者使用JSON.parse(strJson),兼容老版本IE需要引用json2.js。"
            },
            {
                "q": "domready和window.onload的区别？",
                "a": "window.onload需要当页面全部加载完成，包括图片、flash等富媒体；DOMReady只需要判断页面内所有的DOM节点是否已经全部生成，至于节点中的内容是否已经加载完成，它并不关心。因此DOMready触发事件的响应速度比window.onload更快，更迅速。"
            },
            {
                "q": "JSONP原理？",
                "a":"利用script标签的跨域能力,利用sccript的scr指向任何域名的脚本。"
            },
            {
                "q": "老版本IE创建XMLHttpRequest?",
                "a":"ActiveXObject"
            },
            {
                "q": "使用AJAX的get，那么在ie下出现缓存问题怎么解决？",
                "a": "请求的url后面加时间戳或者随机数，使url变为唯一，这样就不会出现ie下的缓存问题了。如：new Date().getTime()或者 Math.random()"
            },
            {
                "q": "使用AJAX的时候，什么时候选择get，什么时候选择post？",
                "a": "与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。\r\n然而，在以下情况中，请使用 POST 请求：\r\n无法使用缓存文件（更新服务器上的文件或数据库）\r\n向服务器发送大量数据（POST 没有数据量限制）\r\n发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠"
            },
            {
                "q": "简述下onreadystatechange在AJAX中的作用 ？",
                "a": "每当 readyState 改变时，就会触发 onreadystatechange 事件。\r\nreadyState 属性存有 XMLHttpRequest 的状态信息。从 0 到 4 发生变化。\r\n0: 请求未初始化\r\n1: 服务器连接已建立\r\n2: 请求已接收\r\n3: 请求处理中\r\n4: 请求已完成，且响应已就绪\r\nstatus\r\n200: 'OK'\r\n404: 未找到页面\r\n当 readyState 等于 4 且status为 200 时，表示响应已就绪"
            },
            {
                "q": "AJAX中async为true和false的区别 ？",
                "a": "一般使用AJAX，请求均设置异步请求。如果需要发送同步请求，将async设置为 false。值得注意的是，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行"
            },
            {
                "q": "动态加载js的四种方式？",
                "a": "1、直接document.write ，document.write(\"<script src='test.js'></script>\");\r\n2、动态改变已有script的src属性\r\n3、动态创建script元素 \r\n 4、原理：用XMLHttpRequest 取得要脚本的内容，再创建script元素。 "
            },
            {
                "q": "substr和substring的区别？",
                "a": "substr(start,length);substring(start,end)"
            },
            {
                "q": "NaN、null、undefined分别是什么意思？",
                "a": "NaN是not a number的缩写,代表特殊的数字；null 表示一个空对象指针 所以 typeof null返回 object,常用来防止内存泄露和去除引用（Dereference）；undefined好理解一般用来表示未定义，而且不能用delete来删除它;undefined派生自null alert(null == undefined) 返回true; 但alert(null === undefined)就返回false了 "

            },
            {
                "q": "delete的作用？",
                "a": "delete 操作符用来删除一个对象的属性或数组中的元素"
            },
            {
                "q": "javascript中的对象类型的判定方式？",
                "a": "function isType(type) {\r\n  return function (obj) {\r\n   return Object.prototype.toString.call(obj) === \"[object \" + type + \"]\"\r\n  }\r\n}\r\nvar isObject = isType(\"Object\")\r\nvar isString = isType(\"String\")\r\nvar isArray = Array.isArray || isType(\"Array\")\r\nvar isFunction = isType(\"Function\") "

            },
            {
                "q": "hasOwnProperty的作用？",
                "a": "hasOwnProperty是js中唯一一个处理属性但是不查找原型链的函数 "
            },
            {
                "q": "如果hasOwnProperty被占用呢，怎么使用hasOwnProperty？",
                "a": "var obj = {\r\n hasOwnProperty: function(){\r\n return false;\r\n },\r\n  prop: 'this is bad...'\r\n };\r\n obj.hasOwnProperty('prop'); // 总是返回false\r\n //这样解决：\r\n {}.hasOwnProperty.call(obj,'prop'); // 返回true"
            },
            {
                "q": "DOM何为BOM，它们提供了哪些对象?",
                "a": "BOM提供了独立于内容而与浏览器窗口进行交互的对象。BOM中的对象\r\nWindow对象：\r\n是整个BOM的核心，所有对象和集合都以某种方式回接到window对象。Window对象表示整个浏览器窗口，但不必表示其中包含的内容。\r\nDocument对象：\r\n实际上是window对象的属性。这个对象的独特之处是唯一一个既属于BOM又属于DOM的对象。从BOM角度看，document对象由一系列集合构成，这些集合可以访问文档的各个部分。\r\nLocation对象：\r\n它是window对象和document对象的属性。Location对象表示载入窗口的URL，此外它还可以解析URI.\r\nNavigator对象：\r\nNavigator包含大量Web浏览器相关的信息。各种浏览器支持该对象的属性和方法不尽相同。\r\nScreen对象：\r\n通过其可以获取用户屏幕相关的信息。\r\nDOM 文档对象模型\r\nDOM是针对XML的基于树的API。描述了处理网页内容的方法和接口，是HTML和XML的API，DOM把整个页面规划成由节点层级构成的文档。"

            },
            {
                "q": "DOM元素的创建、修改、删除等操作",
                "a": "elem=document.createElement('a');\r\nelem.className=‘clsname’;\r\n elem.style.color='red';\r\ndocument.body.appendChild(elem);"
            },
            {
                "q": "改变页面元素的样式的多种方式",
                "a":"添加link标签或style标签document.createElement('link')；\r\n改变class属性elem.className=‘clsname’\r\n改变样式elem.style.color='red';elem.style.cssText='color:red'"
        
            },
            {
                "q": "DOM元素添加自定义属性，及自定义属性值的获取",
                "a": "setAttribute、getAttribute"

            }
            
            
 
        ]
    },
    {
        "jQuery": [
            {
                "q": "使用jQuery怎么隐藏了 HTML 文档中所有的 <p> 元素?",
                "a": "$(\"p\").hide();"
            },
            {
                "q": "jQuery文档就绪两种方式？",
                "a": "$(document).ready(function(){\r\n});\r\n$(function(){\r\n}）"
            },
            {
                "q": "jQuery为什么这么流行？",
                "a": "因为专注于dom。比如查找筛选dom,运动dom,设置读取dom,拼接裁剪dom，监听dom;并且支持隐式迭代和连缀。"
            },
            {
                "q": "jQuery Deferred模块作用？",
                "a": "把javascript异步编程中常用回掉拉平，放到promise的then里面。"
            },
            {
                "q": "jquery获取鼠标相对于一个元素的偏移量？",
                "a": " var offset=$(element).offset();\r\nevent.pageX-offset.left,event.pageY-offset.top"

            },
            {
                "q": "jquery的AJAX方法,设置dataType为json时,服务器端返回的数据格式有什么要求？",
                "a": " 服务器要返回JSON格式的字符串,并且key和value除数字对象和数组外都要使用双引号，不然浏览器端不能成功回调"

            }

        ]
    },
    {
        "CSS": [
            {
                "q": "盒子模型？",
                "a": "内容(content)、填充(padding)、边框(border)、边界(margin)， CSS盒子模式都具备这些属性。"
            },
            {
                "q": "内边距折叠的解决方式之一？",
                "a": "给父容器加上border。"
            },
            {
                "q": "什么是怪异模式或者标准模式？",
                "a": "由于历史的原因，各个浏览器在对页面的渲染上存在差异，甚至同一浏览器在不同版本中，对页面的渲染也不同。在W3C标准出台以前，浏览器在对页面的渲染上没有统一规范，产生了差异(Quirks mode或者称为Compatibility Mode)；由于W3C标准的推出，浏览器渲染页面有了统一的标准(CSScompat或称为Strict mode也有叫做Standars mode)，这就是二者最简单的区别。 "
            },
            {
                "q": "如何控制浏览器进入怪异模式或者标准模式？",
                "a": "DTD，既是网页的头部声明，浏览器会通过识别DTD而采用相对应的渲染模式 "
            },
            {
                "q": "IE下怪异模式下的盒模型与标准盒模型的区别？",
                "a": "IE怪异模式盒子的宽度和高度包括border,标准模式仅仅包括content. "
            },
            {
                "q": "如何判定现在是标准模式还是怪异模式？",
                "a": "方法一：执行以下代码\r\nalert(window.top.document.compatMode) ;\r\n//BackCompat  表示怪异模式\r\n//CSS1Compat  表示标准模式\r\n方法二：jquery为我们提供的方法，如下：\r\nalert($.boxModel)\r\nalert($.support.boxModel) "
            },
            {
                "q": "ul在不同浏览器下的默认样式的差异?",
                "a": " ul 默认值中，IE给了ul一个margin值,而FF给了一个padding值。"

            },
            {
                "q": "什么是reset.css?",
                "a": "在HTML标签在浏览器里有默认的样式，例如 p 标签有上下边距，strong标签有字体加粗样式，em标签有字体倾斜样式。不同浏览器的默认样式之间也会有差别，例如ul默认带有缩进的样式，在IE下，它的缩进是通过margin实现的，而Firefox下，它的缩进是由padding实现的。在切换页面的时候，浏览器的默认样式往往会给我们带来麻烦，影响开发效率。所以解决的方法就是一开始就将浏览器的默认样式全部去掉，更准确说就是通过重新定义标签样式。“覆盖”浏览器的CSS默认属性。最最简单的说法就是把浏览器提供的默认样式覆盖掉！这就是CSS reset。"
            },
            {
                "q": "reset.css一般包含什么？",
                "a": "如YUI reset.css：\r\nhtml{color:#000;background:#FFF}\r\nbody,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0}\r\ntable{border-collapse:collapse;border-spacing:0}\r\nfieldset,img{border:0}\r\naddress,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal}\r\nol,ul{list-style:none}\r\ncaption,th{text-align:left}\r\nh1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}\r\nq:before,q:after{content:''}\r\nabbr,acronym{border:0;font-variant:normal}\r\nsup{vertical-align:text-top}\r\nsub{vertical-align:text-bottom}\r\ninput,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit}\r\ninput,textarea,select{*font-size:100%}\r\nlegend{color:#000}\r\n#yui3-css-stamp.cssreset{display:none}"

            },
            {
                "q": "什么是CSS sprite？",
                "a": "CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position可以用数字能精确的定位出背景图片的位置。\r\n利用CSS Sprites能很好地减少了网页的http请求，从而大大的提高了页面的性能，这也是CSS Sprites最大的优点，也是其被广泛传播和应用的主要原因；\r\nCSS Sprites能减少图片的字节，曾经比较过多次3张图片合并成1张图片的字节总是小于这3张图片的字节总和。"
            },
            {
                "q":"line-height垂直居中和vertical-align垂直居中的区别是？",
                "a": "line-height相对于整个元素box垂直居中，vertical-align相对于box中一行垂直居中。"
            },
            {
                "q": "兼容常见浏览器的行内块元素css写法？",
                "a": "display: inline-block; \r\nzoom: 1; *display: inline; "
            },
            {
                "q": "相对定位和绝对定位的区别是？",
                "a": "1.left top单独存在没有意义，必须定义position属性\r\n2.relative的定位是相对于它以前在标准流当中的位置,并且该盒子以前占据的区域依然存在\r\n3.absolute的定位是相对于它的父容器，它的父容器必须满足一个要求----定位为absolute/relative\r\n4.定义了absolute的元素，会脱离标准流。（该盒子以前占据的区域不再存在） "
            } ,
            {
                "q": "960网格布局系统？",
                "a": "960px 网格系统 , 也称 960 栅格布局, 数年来作为网页设计人员的最爱, 被用来搭建网站和设计网页布局. 。该无疑是非常好的网格系统, 因为相当灵活. 它帮助网页设计者快速地构造以下栏栅数目的布局原型: 9 x 3, 3 x 3 x 3, 4 x 4 x 4 x 4, 10 x 2 等. 960 网格系统可能是现在最受欢迎的网格系统, 并已经在很多网站和设计模板上使用。如新浪、网易、搜狐等。 "
            },
            {
                "q": "IE的hasLayout？",
                "a": "haslayout 是Windows Internet Explorer渲染引擎的一个内部组成部分。在InternetExplorer中，一个元素要么自己对自身的内容进行计算大小和组织，要么依赖于父元素来计算尺寸和组织内容。为了调节这两个不同的概念，渲染引擎采用了 hasLayout 的属性，属性值可以为true或false。当一个元素的 hasLayout属性值为true时，我们说这个元素有一个布局（layout）,它负责对自己和可能的子孙元素进行尺寸计算和定位。简单来说，这意味着这个元素需要花更多的代价来维护自身和里面的内容，而不是依赖于祖先元素来完成这些工作。 "
            },
            {
                "q": "ie6下div不能遮挡select控件的解决方案?",
                "a": "利用iframe来遮挡select，再用div来遮挡iframe"

            },
            {
                "q": "ie6下png不透明的常用解决办法?",
                "a": "使用透明gif。如\r\nbackground: url(\"/style.ssl/5/images/ptlogin.png\") 0 0 no-repeat;\r\n_background: url(\"/style.ssl/5/images/ptlogin.gif\") 0 0 no-repeat;"

            },
            {
                "q": "如何全浏览器兼容地设置某个元素的透明度为50%？",
                "a": ".transparent_class {\r\n   filter:alpha(opacity=50);\r\n   -moz-opacity:0.5;\r\n   -khtml-opacity: 0.5;\r\n   opacity: 0.5;  \r\n}   "

            },
            {
                "q": "页面中的元素定位可以分为哪三类？",
                "a": "normal flow, floats和absolute"
            },
            {
                "q": "什么是双飞翼布局？",
                "a": "双飞翼布局是利用浮动、负边距的三栏布局---【子列】  【主列】 【附加列】。【主列】 优先加载且自适应宽度,需要的hack非常少（就一个针对ie6的清除浮动hack:_zoom: 1;）,在浏览器上的兼容性非常好，IE5.5以上都支持。不足的地方是【主列】 需要添加一个额外的包裹层。   "
            },
            {
                "q": "padding一个值、二个值、三个值、四个值时候的所指方向？",
                "a": "上右下左、上下  左右、上  左右  下、 上  右  下  左。   "
            },
            {
                "q": "什么行内元素，它们有什么特点？",
                "a": "英文：inline element，其中文叫法有多种，如：内联元素、内嵌元素、行内元素、直进式元素等。特点：\r\n 1、和其他元素都在一行上；\r\n 2、高度、行高和顶以及底边距都不可改变；\r\n 3、宽度就是它的文字或图片的宽度，不可改变。   "
            },
            {
                "q": "text-align:center作用？",
                "a": "text-align：center是将元素下面的内联元素居中显示。   "
            },
            {
                "q": "margin 0 auto作用？",
                "a": "auto代表忽略左右边距，所以会呈现居中状态。   "
            }
            
            
        ]
    },
    {
        "PHP": [{
            "q": "PHP中@的作用？",
            "a": "错误抑制符。工作原理： 使用@时的实际操作为： 1. 保存当前的error_reporting值, 并设置error_reporting(0)，即关闭错误输出 2. 恢复之前保存的error_reporting值"
        }
            
        ]
    },
    {
        "HTML5": []
    },
    {
        "CSS3": [
            {
                "q": "transition？",
                "a": "css的transition允许css的属性值在一定的时间区间内平滑地过渡。transition主要包含四个属性值：执行变换的属性：transition-property,变换延续的时间：transition-duration,在延续时间段，变换的速率变化transition-timing-function,变换延迟时间transition-delay。"
            },
            {
                "q": "transform？",
                "a": "设置或读取元素的变换。包括以下属性：无转换none、变换矩阵matrix、平移translate(3d/X/Y)、旋转rotate、缩放scale(X/Y)、斜切扭曲skew(X/Y)"
            },
            {
                "q": "说一说transform的平移translate(3d/X/Y)？",
                "a": "以前如果要写一个元素移动的动画，通常我们会设置某元素位置为absolute，然后通过JS改变其top,left,right,bottom等属性来实现动画，现在可以使用css3 translate配合transition来做到这一点，而完全不需要设置position为absolute，更不需要定时器（如jquery的animate）。"
            }
        ]
    },
    {
        "SQL": []
    },
    {
        "Other": [
            {
                "q": "点击a标签，让其打开新窗口怎么实现？",
                "a":"设置a标签的target='_blank'"
            }

        ]
    }
    ];