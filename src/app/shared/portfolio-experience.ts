import { PortfolioExperienceInfo } from "./portfolio-experience-info";

export class PortfolioExperience {
    id: number = 0;
    profileId: number = 0;
    type: string = "";
    info: PortfolioExperienceInfo = new PortfolioExperienceInfo();
    addDate: Date = new Date();
    updateDate: Date = new Date();
}
