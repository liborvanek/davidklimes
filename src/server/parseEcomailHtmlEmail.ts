import fetch from 'node-fetch';
const cheerio = require('cheerio');

export async function parseEcomailHtmlEmail(ecomailCampaignId: number) {
  try {
    const ecomailEmail = await fetch(
      `${process.env.ECOMAIL_URL}/campaigns/render/${ecomailCampaignId}`,
    ).then((body) => body.text());

    const $ = cheerio.load(ecomailEmail);

    function findLowestDiv(node) {
      const childrenCount = $(node).children().length;
      const childrenDivCount = $(node).children('div').length;

      if (childrenCount === 1 && childrenDivCount === 1) {
        return findLowestDiv($(node).children());
      } else {
        return $(node).children();
      }
    }

    // Remove newsletter header image
    $('.mj-container a[href="https://davidklimes.cz"]')
      .closest('table[role="presentation"]')
      .closest('tr')
      .remove();

    // Remove all HTML comments and style tags
    $.root()
      .find('*')
      .contents()
      .filter(function () {
        return this.type === 'comment' || this.type === 'style';
      })
      .remove();

    // Remove unwanted block
    $('#block-komentare')
      .closest('table[role="presentation"]')
      .closest('.mj-column-per-100')
      .closest('table[role="presentation"]')
      .closest('div')
      .remove();

    // Remove everything after this block
    $('#block-a-jeste')
      .closest('table[role="presentation"]')
      .closest('.mj-column-per-100')
      .closest('table[role="presentation"]')
      .closest('div')
      .nextAll('*')
      .remove();

    // And this block itself
    $('#block-a-jeste')
      .closest('table[role="presentation"]')
      .closest('.mj-column-per-100')
      .closest('table[role="presentation"]')
      .closest('div')
      .remove();

    // Purge unwanted attributes
    $.root()
      .find('*')
      .removeAttr('style class width role cellpadding cellspacing align border valign bgcolor');

    // Turn all tables into divs
    $('table').each((i, item) => (item.tagName = 'div'));
    $('tr').each((i, item) => (item.tagName = 'div'));
    $('td').each((i, item) => (item.tagName = 'div'));
    $('tbody').each((i, item) => (item.tagName = 'div'));

    // This is very dirty, but it works!
    const unWrapped = [];
    $('body > div').each(function (i, elem) {
      unWrapped.push(findLowestDiv(elem));
    });
    const unWrappedMarkup = unWrapped.map((el) => $.html(el)).join('');

    // One more clean-up round
    const secondRound = $.parseHTML(unWrappedMarkup);

    const cleanerMarkup = [];
    $(secondRound).each(function (i, elem) {
      cleanerMarkup.push(findLowestDiv(elem));
    });

    return cleanerMarkup.map((el) => $.html(el)).join('');
  } catch (error) {
    throw new Error(`Error parsing Ecomail email. Reason: ${error}`);
  }
}
