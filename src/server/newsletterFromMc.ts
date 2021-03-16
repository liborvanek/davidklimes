import { insertMultipleArticles } from './dbApi';
// import { mcNewsletter } from '../newslettery-mailchimp';

export const newslettersFromMc = async () => {
  // try {
  //   const mc = mcNewsletter.map((newsletter) => ({
  //     _id: undefined,
  //     id: parseInt(newsletter.settings.title),
  //     externalId: newsletter.web_id,
  //     title: newsletter.settings.subject_line.replace('Newsletter DK: ', ''),
  //     isoDate: newsletter.send_time,
  //     archiveUrl: newsletter.archive_url,
  //     originalData: newsletter,
  //   }));
  //   insertMultipleArticles('newsletterArchive', mc);
  //   console.log(
  //     `Newsletter sync is successfull.
  //       Added: ${mc.length} new newsletter(s).`,
  //   );
  // } catch (error) {
  //   console.error('Newsletter sync failed, reason: ', error);
  // }
};
