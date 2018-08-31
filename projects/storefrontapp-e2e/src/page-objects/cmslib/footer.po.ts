import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class Footer {
  readonly footerNavigation: ElementFinder = element(
    by.dynamicSlot('Footer', 'y-footer-navigation')
  );
  readonly notice: ElementFinder = this.footerNavigation.element(
    by.css('.y-footer-navigation__notice')
  );
  readonly linkSections: ElementArrayFinder = this.footerNavigation.all(
    by.css('.y-footer-navigation__container')
  );
  // prettier-ignore
  readonly linkSectionHeader = (sectionNo: number): ElementFinder =>
    this.linkSections.get(sectionNo).element(by.tagName('h1'))

  async getNoticeText(): Promise<string> {
    return this.notice.getText();
  }

  async getSectionsCount(): Promise<number> {
    return this.linkSections.count();
  }

  async getSectionHeader(sectionNo: number): Promise<string> {
    return this.linkSectionHeader(sectionNo).getText();
  }

  async getLinkUrlByTitle(title: string): Promise<string> {
    return this.footerNavigation
      .element(by.linkText(title))
      .getAttribute('href');
  }
}
