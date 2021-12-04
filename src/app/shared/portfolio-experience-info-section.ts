import { PortfolioExperienceInfoSectionInfo } from "./portfolio-experience-info-section-info";

export class PortfolioExperienceInfoSection {
    id: number = 0;
    info: PortfolioExperienceInfoSectionInfo = new PortfolioExperienceInfoSectionInfo();
    addDate: Date = new Date();
    updateDate: Date = new Date();
}
