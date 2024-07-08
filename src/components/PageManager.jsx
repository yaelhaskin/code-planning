import { useEffect, useState } from "react";
import pages from "../pages.json";

import Title from "./Title";
import Explanation from "./Explanation";
import ExampleCards from "./ExampleCards";
import Overlays from "./Overlays";
import Practice from "./Practice/Practice";

const PageManager = () => {
    const [curPage, setCurPage] = useState(0);
    const [showArrows, setShowArrows] = useState(true);
    
    const page = pages.pages[curPage];
    
    let curPageType = page.type;
    let curPageTitle = page.title;
    let curPageText = page.text;

    const [arrows, setArrows] = useState();
    const [visitedCurPage, setVisitedCurPage] = useState(false);

    let curPageBtns = page.btns ? page.btns : null;
    let curPageCards = page.cards ? page.cards : null;
    let curPageAni = page.ani ? page.ani : null;
    let curPageExplanation = page.explanation ? page.explanation : null;
    let curPagePractice = page.practice ? page.practice : null;

    const handleArrows = (showAllArrows, finished) => {
        if(showAllArrows) {
            setArrows({ "back": true, "front": true });
            
            if(JSON.parse(sessionStorage.getItem("visitedPages")).includes(curPage)) {
                setVisitedCurPage(true);
            } else {
                (finished) && 
                    sessionStorage.setItem("visitedPages", 
                                            JSON.stringify([
                                                ...JSON.parse(sessionStorage.getItem("visitedPages")), 
                                                curPage
                                            ])
                                        );
            }
        } else {
            setArrows(page.arrows);
        }
    }

    const displayedPage = {
        "Title": <Title title={curPageTitle} 
                        text={curPageText}
                        btns={curPageBtns} 
                        ani={curPageAni} 
                        setCurPage={setCurPage}
                        setShowArrows={setShowArrows}
                />,
        "Explanation": <Explanation curPage={curPage}
                                    title={curPageTitle} 
                                    text={curPageText} 
                                    ani={curPageAni} 
                                    explainCards={curPageCards} 
                                    explanation={curPageExplanation} 
                                    visitedCurPage={visitedCurPage}
                                    handleArrows={handleArrows}
                        />,
        "ExampleCards": <ExampleCards 
                                    title={curPageTitle} 
                                    text={curPageText} 
                                    exampleCards={curPageCards} 
                                    explanation={curPageExplanation} 
                                    visitedCurPage={visitedCurPage}
                                    handleArrows={handleArrows}
                                    setShowArrows={setShowArrows}
                        />,
        "Practice": <Practice curPage={curPage}
                            title={curPageTitle} 
                            text={curPageText} 
                            practice={curPagePractice}
                            visitedCurPage={visitedCurPage}
                            handleArrows={handleArrows}
                    />,
    }

    useEffect(() => {
        setShowArrows(true);
        setVisitedCurPage(false);
        if(JSON.parse(sessionStorage.getItem("visitedPages"))) {
            // if page has already been done, or if just going back and forth with arrows
            if(JSON.parse(sessionStorage.getItem("visitedPages")).includes(curPage)) {
                handleArrows(true, false, "pageMananger-true");
            } else {
                handleArrows(false, false, "pageMananger-false");
            }
        } else {
            sessionStorage.setItem("visitedPages", JSON.stringify([0]));
        }
    }, [curPage])

    return (
        <div>
            {curPageType !== "Title" && <Overlays curPageType={curPageType} 
                                            arrows={arrows} 
                                            showArrows={showArrows} 
                                            setCurPage={setCurPage} 
                                            setVisitedCurPage={setVisitedCurPage}
                                        />}
            {displayedPage[curPageType]}
        </div>
    )
}

export default PageManager;