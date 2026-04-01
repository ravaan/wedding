import { useState, useEffect, useRef } from "react";

const useClickPattern = (
  pattern = [3, 2, 3],
  onSuccess,
  timeout = 3000,
  pauseTime = { min: 500, max: 2000 },
) => {
  const [clicks, setClicks] = useState([]);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const timeoutRef = useRef(null);
  const phaseTimeoutRef = useRef(null);
  const lastClickTime = useRef(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    };
  }, []);

  const resetPattern = () => {
    setClicks([]);
    setCurrentPhase(0);
    setIsWaiting(false);
    setFeedback("");
    lastClickTime.current = 0;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
  };

  const handleClick = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;

    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // If we're in a new phase (after a pause)
    if (clicks.length > 0 && timeSinceLastClick > pauseTime.min) {
      // Check if the pause was within acceptable range
      if (
        timeSinceLastClick >= pauseTime.min &&
        timeSinceLastClick <= pauseTime.max
      ) {
        // Move to next phase if current phase is complete
        if (clicks.length === pattern[currentPhase]) {
          if (currentPhase < pattern.length - 1) {
            setCurrentPhase(currentPhase + 1);
            setClicks([1]); // Start new phase with 1 click
            setIsWaiting(false);
            setFeedback(`Phase ${currentPhase + 2}/${pattern.length}`);
          }
        } else {
          // Reset if pause came at wrong time
          resetPattern();
          return;
        }
      } else if (timeSinceLastClick > pauseTime.max) {
        // Too long pause, reset
        resetPattern();
        return;
      }
    } else {
      // Continue current phase
      const newClicks = [...clicks, 1];
      setClicks(newClicks);

      // Check if current phase is complete
      if (newClicks.length === pattern[currentPhase]) {
        if (currentPhase === pattern.length - 1) {
          // Pattern complete!
          setFeedback("Pattern complete!");
          onSuccess();
          setTimeout(resetPattern, 500);
          return;
        } else {
          // Phase complete, waiting for pause
          setIsWaiting(true);
          setFeedback(
            `Phase ${currentPhase + 1}/${pattern.length} complete - pause now`,
          );
        }
      } else {
        setFeedback(`${newClicks.length}/${pattern[currentPhase]} clicks`);
      }
    }

    lastClickTime.current = now;

    // Set timeout to reset pattern if no activity
    timeoutRef.current = setTimeout(() => {
      if (currentPhase > 0 || clicks.length > 0) {
        resetPattern();
      }
    }, timeout);
  };

  return {
    handleClick,
    resetPattern,
    progress: {
      currentPhase,
      clicks: clicks.length,
      targetClicks: pattern[currentPhase] || 0,
      isWaiting,
      feedback,
      pattern,
    },
  };
};

export default useClickPattern;
