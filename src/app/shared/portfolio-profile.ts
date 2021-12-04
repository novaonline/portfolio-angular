import { PortfolioProfileInfo } from "./portfolio-profile-info";

export class PortfolioProfile {
    id: number = 0;
    info: PortfolioProfileInfo = new PortfolioProfileInfo();
    addDate: Date = new Date();
    updateDate: Date = new Date();
}
