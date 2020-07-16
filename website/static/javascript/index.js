const githubBase = "https://github.com/citahub/cita/blob/develop/docs/zh-CN/";

function htmlToElements(html) {
  var template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

const items = [
  {
    name: "DApp",
    href: "https://github.com/citahub/first-forever-demo",
    shape: "rect",
    left: "14.5%",
    top: "8.2%",
    width: "8%",
    height: "8%",
    logo: "https://www.citahub.com/images/component/tool_dappdemos.png",
    title: "DApp Demos",
    subTitle: ''
  },
  {
    name: "Microscope",
    href: "https://github.com/citahub/microscope-v2",
    shape: "rect",
    left: "14.5%",
    top: "23.5%",
    width: "8%",
    height: "8%",
    logo: "https://www.citahub.com/images/component/tool_microscope.png",
    title: "Microscope 多链浏览器",
    subTitle: ''
  },
  {
    name: "Cyton",
    href: "https://github.com/citahub/cyton-ios",
    shape: "rect",
    left: "14.5%",
    top: "32.5%",
    width: "8%",
    height: "9%",
    logo: "https://www.citahub.com/images/component/tool_cyton.png",
    title: "Cyton 多链钱包",
    subTitle: ''
  },
  {
    name: "ReBirth",
    href: "https://github.com/citahub/re-birth",
    shape: "rect",
    left: "39.5%",
    top: "32.5%",
    width: "9%",
    height: "8%",
    logo: "https://www.citahub.com/images/component/tool_rebirth.png",
    title: "ReBirth 区块链缓存服务",
    subTitle: ''
  },
  {
    name: "CITA Monitor",
    href: "https://github.com/citahub/cita-monitor",
    shape: "rect",
    left: "39.5%",
    top: "55%",
    width: "9%",
    height: "8%",
    logo: "https://www.citahub.com/images/component/tool_monitor.png",
    title: "CITA Monitor",
    subTitle: ''
  },
  {
    name: "CITA",
    href: "https://github.com/citahub/cita",
    shape: "rect",
    left: "64.5%",
    top: "78%",
    width: "12%",
    height: "7%",
    logo: "/assets/cita.png",
    title: "CITA",
    subTitle: ''
  },
  {
    name: "Smart Contract",
    href: "https://github.com/citahub/test-contracts",
    shape: "rect",
    left: "62%",
    top: "8.5%",
    width: "20%",
    height: "10%",
    logo: "https://www.citahub.com/images/component/tool_economics.png",
    title: "智能合约样例",
    subTitle: ''
  },
  {
    name: "CITA IDE",
    href: "https://github.com/citahub/cita-ide",
    shape: "rect",
    left: "62%",
    top: "32.5%",
    width: "9%",
    height: "8%",
    logo: "https://www.citahub.com/images/component/tool_citaIDE.png",
    title: "CITA IDE 合约开发与部署工具",
    subTitle: ''
  },
  {
    name: "CITA Truffle Box",
    href: "https://github.com/citahub/cita-truffle-box",
    shape: "rect",
    left: "73%",
    top: "32.5%",
    width: "9%",
    height: "8%",
    logo: "https://www.citahub.com/images/component/tool_trufflebox.png",
    title: "CITA Truffle Box",
    subTitle: ''
  },
  {
    name: "CITA Web Debugger",
    href:
        "https://github.com/citahub/cita-sdk-js/tree/develop/packages/cita-web-debugger",
    shape: "rect",
    left: "83.5%",
    top: "32.5%",
    width: "9%",
    height: "8%",
    logo: "https://www.citahub.com/images/component/tool_webdebugger.png",
    title: "CITA Web Debugger",
    subTitle: ''
  },
  {
    name: "CITA SDK",
    href: "https://github.com/citahub?q=cita-sdk",
    shape: "rect",
    left: "62%",
    top: "49%",
    width: "9%",
    height: "8.5%",
    logo: "https://www.citahub.com/images/component/tool_sdk.png",
    title: "全平台 SDK",
    subTitle: ''
  },
  {
    name: "CITA CLI",
    href: "https://github.com/citahub/cita-cli",
    shape: "rect",
    left: "79%",
    top: "55%",
    width: "9%",
    height: "8.5%",
    logo: "https://www.citahub.com/images/component/tool_cli.png",
    title: "CITA-CLI",
    subTitle: ''
  },
  {
    name: "TESTNET",
    href: "/zh-CN/toolchain/testnet/testchain",
    shape: "rect",
    left: "77%",
    top: "75%",
    width: "10%",
    height: "4%",
    logo: '',
    title: "CITA 测试链",
    subTitle: `<p class="subTitle">curl -sS -X POST --data '{"jsonrpc":"2.0","method":"getMetaData","params":["latest"],"id":1}' https://testnet.citahub.com</p>`
  }
];

function CoordinatesMaps(items, srcUrl) {
  this.target = document.querySelector(`img[src="${srcUrl}"]`);
  this.parent = this.target.parentNode;
  this.items = items;
  this.map = null;
  this.mapClassName = "mapItem";
}

CoordinatesMaps.prototype.getMapString = function () {
  return this.items
      .map(
          function (item) {
            return `<div style="position: absolute;width: ${item.width};
     height: ${item.height};left: ${item.left};top: ${item.top}"
                      data-name="${item.name}"
                      class="${this.mapClassName}" >
                </div>`;
          }.bind(this)
      )
      .reduce(function (s, cul) {
        return s + cul;
      }, "");
};
CoordinatesMaps.prototype.showItem = function (item) {
  const found = this.items.find(function (i) {
    return i.name === item.dataset.name;
  });
  const tooltipDom = htmlToElements(`<div class="tooltip"><a  href="${
      found.href
  }" target="_blank">
      ${found.logo && `<img src="${found.logo}" alt="" width="80px">`}
      <div class="title">${found.title}</div>
      ${found.subTitle && `<p>${found.subTitle}</p>`}
    </a></div>`);

  if (document.querySelectorAll(".tooltip").length > 0) {
    return false;
  } else {
    item.append(tooltipDom);
    item.querySelector(".tooltip").classList.add("on");
  }
};

CoordinatesMaps.prototype.hideItem = function (item) {
  // item.querySelector(".tooltip").classList.remove("on");
  item.querySelector(".tooltip") && item.querySelector(".tooltip").remove();
};

CoordinatesMaps.prototype.bindOne = function (item) {
  function findTooltip(node) {
    return node.classList.contains("tooltip") ||
        node.parentNode.classList.contains("tooltip") ||
        node.parentNode.parentNode.classList.contains("tooltip")
  }

  item.addEventListener(
      "mouseover",
      function (e) {
        if (document.querySelectorAll(".tooltip").length > 0) {
          return;
        }
        this.showItem(item);
      }.bind(this)
  );

  item.addEventListener(
      "mouseout",
      function (e) {
        if ( (e.relatedTarget && findTooltip(e.relatedTarget)) || (e.toElement && findTooltip(e.toElement))  ) {
          e.stopPropagation();
          this.showItem(item);
          return;
        }
        this.hideItem(item);
      }.bind(this)
  );
};

CoordinatesMaps.prototype.bindEvent = function () {
  if (this.map) {
    this.map.querySelectorAll("." + this.mapClassName).forEach(
        function (item) {
          this.bindOne(item);
        }.bind(this)
    );
  }
};

CoordinatesMaps.prototype.getMap = function () {
  const mapDom = this.getMapString();
  this.map = htmlToElements(
      '<div id="firstPageMap" style="position: absolute; height: 100%; width: 100%; top: 0; left: 0">' +
      mapDom +
      "</div>"
  );
};

CoordinatesMaps.prototype.ready = function () {
  this.parent.classList.add("firstPageImageParent");
  this.parent.append(this.map);
};

CoordinatesMaps.prototype.init = function () {
  if (this.target) {
    this.getMap();
    this.bindEvent();
    this.ready();
  }
};

function addEditOnGithub() {
  const match = window.location.pathname.split(/zh-CN\/next\/cita\//);
  if (match.length === 2) {
    const hEl = document.querySelector("header.postHeader");
    const eBtn = document.createElement("a");
    eBtn.textContent = "编辑";
    eBtn.setAttribute("href", `${githubBase}${match[1]}.md`);
    eBtn.setAttribute("target", "_blank");
    eBtn.setAttribute("rel", "noreferrer noopener");
    eBtn.className = "edit-page-link button";
    eBtn.style.marginLeft = "15px";
    hEl.prepend(eBtn);
  }
}

function translateEnUs() {
  const l = document.querySelector(".postHeader a[href$=en-US]");
  if (l) {
    l.setAttribute("href", l.href.slice(0, -3));
  }
}

function addGA() {
  if (window.location.href.indexOf("docs.citahub.com") > -1) {
    var googleScript = document.createElement("script");
    googleScript.src =
        "https://www.googletagmanager.com/gtag/js?id=UA-134504127-3";
    googleScript.async = true;
    googleScript.onload = function () {
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }

      gtag("js", new Date());
      gtag("config", "UA-134504127-3");
    };
    document.body.append(googleScript);
  }
}

function addBaiduTongji() {
  if (window.location.href.indexOf('docs.citahub.com') > -1) {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?87fe8c7beae6c017f649daa66b27505d";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }
}

window.onload = () => {
  const welcome = "/welcome";
  const logoEl =
      document.querySelector(".fixedHeaderContainer a[href='/en-US']") ||
      document.querySelector(".fixedHeaderContainer a[href='/zh-CN']");
  logoEl.setAttribute("href", logoEl.href + welcome);

  // add edit on github
  addEditOnGithub();
  translateEnUs();
  // add Google Analytics
  // addGA()
  // add Baidu Tongji
  addBaiduTongji()
  new CoordinatesMaps(items, "/assets/first-page.jpg").init();
}
