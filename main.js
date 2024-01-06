(()=>{"use strict";class t{constructor(t){this.parent=t,this.onClick=this.onClick.bind(this),this.elementPopover=null}bindToDOM(){const t=document.createElement("button");t.textContent="Click to toggle popover",t.setAttribute("type","submit"),t.classList.add("button-popover"),t.addEventListener("click",this.onClick),this.parent.append(t)}createPopover(){this.elementPopover=document.createElement("div"),this.elementPopover.classList.add("conteiner-popover");const t=document.createElement("div");t.classList.add("arrow"),this.elementPopover.append(t);const e=document.createElement("h3");e.classList.add("popover-title"),e.textContent="Popover title",this.elementPopover.append(e);const n=document.createElement("div");n.classList.add("popover-text"),n.textContent="And here's some amazing content. It's very engaging. Right?",this.elementPopover.append(n)}onClick(t){const e=t.target;if(this.elementPopover)return this.elementPopover.remove(),void(this.elementPopover=null);this.createPopover(),e.append(this.elementPopover);const n=this.elementPopover.querySelector(".arrow"),s=0-n.offsetHeight-this.elementPopover.offsetHeight,i=e.offsetWidth/2-this.elementPopover.offsetWidth/2;this.elementPopover.style.top=`${s}px`,this.elementPopover.style.left=`${i}px`;const o=this.elementPopover.offsetWidth/2-n.offsetWidth/2;n.style.left=`${o}px`}}class e{constructor(){this.conteiner=null,this.inputTitle=null,this.inputPrice=null,this.form=null,this.crossListeners=[],this.saveListeners=[],this.cancelListeners=[],this.iconEditListeners=[],this.iconDeleteListeners=[]}bindToDOM(){const t=document.querySelector("body");this.createMain(),t.append(this.conteiner)}createMain(){const t=document.createElement("main");t.classList.add("content"),this.conteiner=t;const n=e.addHTMLBlockDiv(t,"conteiner-crm"),s=e.addHTMLBlockDiv(n,"conteiner-crm-title");e.addHTMLBlockDiv(s,"crm_title").textContent="Товары";const i=e.addHTMLBlockDiv(s,"crm_title__add");i.textContent="+",i.addEventListener("click",(t=>this.onClickCross(t)));const o=document.createElement("table");o.classList.add("conteiner-table"),n.append(o);const c=document.createElement("tr");o.append(c);const a=["Название","Стоимость","Действия"];for(const t of a){const e=document.createElement("th");e.textContent=t,c.append(e)}}static addHTMLBlockDiv(t,e=null){const n=document.createElement("div");return e&&n.classList.add(e),t.append(n),n}static addHTMLBlockInput(t,e,n){const s=document.createElement("h3");s.textContent=e,t.append(s);const i=document.createElement("input");return i.type="text",i.setAttribute("name",n),i.setAttribute("id",n),i.setAttribute("required",""),t.append(i),i}drawPopup(){const t=e.addHTMLBlockDiv(this.conteiner,"background-popup"),n=e.addHTMLBlockDiv(t,"conteiner-popup");this.form=document.createElement("form"),this.form.classList.add("popup-form"),this.form.setAttribute("novalidate",""),this.form.addEventListener("submit",(t=>this.onClickSave(t))),n.append(this.form),this.inputTitle=e.addHTMLBlockInput(this.form,"Название","title"),this.inputPrice=e.addHTMLBlockInput(this.form,"Стоимость","price"),this.inputPrice.setAttribute("pattern","^[1-9]\\d*");const s=e.addHTMLBlockDiv(this.form,"popup-buttons"),i=document.createElement("button");i.classList.add("button-save"),i.textContent="Сохранить",i.type="submit",s.append(i);const o=document.createElement("button");o.classList.add("button-reject"),o.textContent="Отмена",o.type="reset",o.addEventListener("click",(t=>this.onClickCancel(t))),s.append(o)}deletePopup(){this.conteiner.querySelector(".background-popup").remove()}drawPopupDelete(){const t=e.addHTMLBlockDiv(this.conteiner,"background-popup"),n=e.addHTMLBlockDiv(t,"popup-delete"),s=document.createElement("span");s.textContent="Товар удален",n.append(s);e.addHTMLBlockDiv(n,"popup-delete__cross").addEventListener("click",(()=>t.remove())),setTimeout((()=>{t.remove()}),3e3)}addActions(){const t=document.createElement("td");t.classList.add("product-actions");e.addHTMLBlockDiv(t,"actions-edit").addEventListener("click",(t=>this.onClickIconEdit(t)));return e.addHTMLBlockDiv(t,"actions-delete").addEventListener("click",(t=>this.onClickIconDelete(t))),t}drawValuesTable(t){const e=this.conteiner.querySelector(".conteiner-table");Array.from(e.children).forEach(((t,e)=>{0!==e&&t.remove()}));for(const n of Object.entries(t)){const t=document.createElement("tr");e.append(t);const s=document.createElement("td"),[i,o]=n;s.textContent=i,t.append(s);const c=document.createElement("td");c.textContent=o,t.append(c);const a=this.addActions();t.append(a)}}onClickCross(){this.crossListeners.forEach((t=>t.call(null)))}addCrossListeners(t){this.crossListeners.push(t)}onClickSave(t){t.preventDefault(),this.saveListeners.forEach((t=>t.call(null)))}addSaveListeners(t){this.saveListeners.push(t)}onClickCancel(t){t.preventDefault(),this.cancelListeners.forEach((t=>t.call(null)))}addCancelListeners(t){this.cancelListeners.push(t)}onClickIconEdit(t){this.iconEditListeners.forEach((e=>e.call(null,t)))}addIconEditListeners(t){this.iconEditListeners.push(t)}onClickIconDelete(t){this.iconDeleteListeners.forEach((e=>e.call(null,t)))}addIconDeleteListeners(t){this.iconDeleteListeners.push(t)}}class n{constructor(){this._tooltips=[]}showTooltip(t,e){const n=document.createElement("DIV");n.classList.add("form-error"),n.textContent=t;const s=performance.now();this._tooltips.push({id:s,element:n}),document.body.appendChild(n);const{right:i,top:o}=e.getBoundingClientRect();n.style.left=`${i+15}px`;const c=o+e.offsetHeight/2-n.offsetHeight/2;return n.style.top=`${c}px`,s}removeTooltip(t){this._tooltips.find((e=>e.id===t)).element.remove(),this._tooltips=this._tooltips.filter((e=>e.id!==t))}}const s={title:{valueMissing:"Укажите название товара!"},price:{valueMissing:"Определите стоимость товара!",patternMismatch:"Допустимы только числа больше нуля!"}};class i{constructor(t){this.edit=t,this.data={},this.casheKey=null,this.toolTip=new n,this.actualMessages=[]}init(){this.data={"iPhone XP":6e4,"Samsung Galaxy S10+":8e4,"Huawei View":5e4},this.edit.bindToDOM(),this.edit.drawValuesTable(this.data),this.edit.addCrossListeners(this.onClickCross.bind(this)),this.edit.addSaveListeners(this.onClickSave.bind(this)),this.edit.addCancelListeners(this.onClickCancel.bind(this)),this.edit.addIconEditListeners(this.onIconEdit.bind(this)),this.edit.addIconDeleteListeners(this.onIconDelete.bind(this))}showTooltip(t,e){this.actualMessages.push({name:e.name,id:this.toolTip.showTooltip(t,e)})}static getError(t){const e=Object.keys(ValidityState.prototype).find((e=>!!t.name&&("valid"!==e&&t.validity[e])));return!!e&&s[t.name][e]}elementOnBlur(t){const e=t.target,n=i.getError(e),s=this.actualMessages.find((t=>t.name===e.name));if(s){this.toolTip.removeTooltip(s.id);const t=this.actualMessages.indexOf(s);this.actualMessages.splice(t,1)}n&&this.showTooltip(n,e)}onClickSave(){this.actualMessages.forEach((t=>this.toolTip.removeTooltip(t.id))),this.actualMessages=[];const{elements:t}=this.edit.form;if([...t].some((t=>{const e=i.getError(t);return!!e&&(this.showTooltip(e,t),t.focus(),!0)})),this.edit.form.checkValidity()){if(null!==this.casheKey)delete this.data[this.casheKey],this.data[this.edit.inputTitle.value]=this.edit.inputPrice.value,this.casheKey=null;else{const t=Number(this.edit.inputPrice.value);this.data[this.edit.inputTitle.value]=t}this.edit.drawValuesTable(this.data),this.onClickCancel()}}onClickCancel(){this.actualMessages.forEach((t=>{this.toolTip.removeTooltip(t.id)})),this.actualMessages=[],this.edit.deletePopup()}onClickCross(){this.edit.drawPopup(),[...this.edit.form.elements].forEach((t=>t.addEventListener("focus",(()=>{t.addEventListener("blur",this.elementOnBlur.bind(this),{once:!0})})))),this.edit.inputTitle.focus()}onIconEdit(t){this.edit.drawPopup();const e=t.target.closest("tr");this.casheKey=e.children[0].textContent;const n=e.children[1].textContent;this.edit.inputTitle.value=this.casheKey,this.edit.inputPrice.value=n}onIconDelete(t){const e=t.target.closest("tr").children[0].textContent;delete this.data[e],this.edit.drawValuesTable(this.data),this.edit.drawPopupDelete()}}const o=document.querySelector("body"),c=function(){const t=document.createElement("main");t.classList.add("content");const e=[d,l];for(let n=0;n<2;n+=1){const s=document.createElement("a");s.classList.add("link__task"),s.textContent=`Задача ${n+1}`,t.append(s),s.addEventListener("click",e[n])}return t}();function a(t){const e=document.createElement("button");e.textContent="Return",e.classList.add("btn-return"),t.append(e),e.addEventListener("click",(t=>(o.className="",o.innerHTML="",void o.append(c))))}function d(){o.innerHTML="",o.classList.add("task-1");for(let e=0;e<3;e+=1){const n=document.createElement("div");n.classList.add("conteiner"),n.classList.add(`test${e+1}`),o.append(n);new t(n).bindToDOM()}a(o)}function l(){o.innerHTML="";const t=new e;new i(t).init(),a(t.conteiner)}o.append(c)})();