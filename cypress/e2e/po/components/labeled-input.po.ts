import ComponentPo from '@/cypress/e2e/po/components/component.po';
import { CypressChainable } from '@/cypress/e2e/po/po.types';

export default class LabeledInputPo extends ComponentPo {
  static byLabel(self: CypressChainable, label: string): LabeledInputPo {
    return new LabeledInputPo(
      self
        .find('.labeled-input', { includeShadowDom: true })
        .contains(label)
        .next()
    );
  }

  static bySelector(self: CypressChainable, selector: string): LabeledInputPo {
    return new LabeledInputPo(
      self
        .find(`${ selector } input`, { includeShadowDom: true })
    );
  }

  /**
   * Type value in the input
   * @param value Value to be typed
   * @param secret Pass in true to hide sensitive data from logs
   * @returns
   */
  set(value: string, secret?: boolean): Cypress.Chainable {
    this.input().should('be.visible');
    this.input().focus();
    this.input().clear();

    if (secret) {
      return this.input().type(value, { log: false });
    } else {
      return this.input().type(value);
    }
  }

  clear() {
    return this.input().clear();
  }

  value(): Cypress.Chainable {
    throw new Error('Not implements');
    // The text for the input field is in a shadow dom element. Neither the proposed two methods
    // to dive in to the shadow dom work
    // return this.input().find('div', { includeShadowDom: true }).invoke('text');
    // return this.input().shadow().find('div').invoke('text');
  }

  /**
   * Return the input HTML element from given container
   * @returns HTML Element
   */
  private input(): Cypress.Chainable {
    return this.self();
  }
}
