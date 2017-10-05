import { Section } from './section';
import { ContentInfo } from './content-info';
export class Content {
  htmlId: string;
  info: ContentInfo;
  sections: Section[];
  addDate: string;
  updateDate: string;
  id: number;
}
