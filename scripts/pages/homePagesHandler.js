export const homePagesKey = "homePagesHanlder";
localStorage.setItem(homePagesKey, JSON.stringify({current_page: ""}));

const actualPage = JSON.parse(localStorage.getItem(homePagesKey));

const HomePagesHanlder = {
    currentPage: actualPage.current_page || "myBoards",
    setCurrentPage(page) {
        this.currentPage = page;
        const data = { current_page: page }
        localStorage.setItem(homePagesKey, JSON.stringify(data));
    }
}

export default HomePagesHanlder;