import type { App, Directive, DirectiveBinding } from 'vue';
// 派发自定义事件
function isInput(el: Element, binding: any, vnode: any) {
  const input: any = el.querySelector('input') || el;
  console.log(el, input, binding);
  const regDecimal = RegExp(`^\\D*(\\d{0,${binding.value || 8}}(?:\\.\\d{0,2})?).*$`, 'g');
  input.addEventListener('compositionstart', () => {
    vnode.inputLocking = true;
  });
  input.addEventListener('compositionend', () => {
    vnode.inputLocking = false;
    input.dispatchEvent(new Event('input'));
  });
  input.addEventListener(
    'input',
    (e) => {
      e.preventDefault(); // 阻止掉默认的change事件
      if (vnode.inputLocking) {
        return;
      }
      const oldValue = input.value;
      let newValue;
      if (binding.modifiers.int) {
        newValue = e.target.value
          .replace(/\$\s?|(,*)/g, '')
          .replace(/[\D]/g, '')
          .slice(0, binding.value || 8);
      } else {
        newValue = e.target.value.replace(/\$\s?|(,*)/g, '').replace(regDecimal, '$1');
      }

      if (newValue) {
        const arr = newValue.split('.');
        newValue = Number(arr[0]) + (arr[1] === undefined ? '' : '.' + arr[1]); // 去掉开头多余的0
      }
      binding.modifiers.format && (newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')); // 是否格式化
      if (newValue !== oldValue) {
        input.value = newValue;
        input.dispatchEvent(new Event('input')); // 通知v-model更新
      }
    },
    true,
  );
  // input 事件无法处理小数点后面全是零的情况 因为无法确定用户输入的0是否真的应该清除，如3.02。放在blur中去处理
  input.addEventListener('blur', () => {
    const oldValue = input.value;
    let newValue = input.value;
    if (newValue) {
      newValue = Number(newValue.replace(/\$\s?|(,*)/g, '')).toFixed(2);
    }
    // 判断是否需要更新，避免进入死循环
    if (newValue !== oldValue) {
      input.value = newValue;
      input.dispatchEvent(new Event('input')); // 通知v-model更新
    }
  });
}

const mounted = (el: Element, binding: DirectiveBinding<any>, vnode) => {
  isInput(el, binding, vnode);
};

const inputDirective: Directive = {
  mounted,
};

export function setupInputDirective(app: App) {
  app.directive('input', inputDirective);
}

export default inputDirective;
