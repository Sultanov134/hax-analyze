import { html, fixture, expect } from '@open-wc/testing';
import "../hax-analyze.js";

describe("HaxAnalyze test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <hax-analyze
        title="title"
      ></hax-analyze>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
