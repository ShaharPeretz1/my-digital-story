function [X_labels_temp] = labels_features_extraction(curr_labels)
 %% labels feaures  
 
    % number of each kind of activity
    numFun = count(curr_labels.Activities,'fun'); meanFun = mean(numFun); sumFun = sum(numFun); 
    if ~isempty(sumFun)
        X_labels_temp(:,1) = numFun/sumFun;
    else
        X_labels_temp(:,1) = 0;
    end
    numFam = count(curr_labels.Activities,'family'); meanFam = mean(numFam); sumFam = sum(numFam);
    if ~isempty(sumFam)
        X_labels_temp(:,2) = numFam/sumFam;
    else
        X_labels_temp(:,2) = 0;
    end
    numLate = count(curr_labels.Activities,'late_fun');meanLate = mean(numLate); sumLate = sum(numLate);
    if ~isempty(sumLate)
        X_labels_temp(:,3) = numLate/sumLate;
    else
        X_labels_temp(:,3) = 0;
    end
    
    numWork = count(curr_labels.Activities,'work_research');meanWork = mean(numWork); sumWork = sum(numWork);
    if ~isempty(sumWork)
        X_labels_temp(:,4) = numWork/sumWork;
    else
        X_labels_temp(:,4) = 0;
    end
    numStudy = count(curr_labels.Activities,'studies');meanStudy = mean(numStudy); sumStudy = sum(numStudy);
    if ~isempty(sumStudy)
        X_labels_temp(:,5) = numStudy/sumStudy;
    else
        X_labels_temp(:,5) = 0;
    end
    numSports = count(curr_labels.Activities,'sports');meanSports = mean(numSports); sumSports = sum(numSports);
    if ~isempty(sumSports)
        X_labels_temp(:,6) = numSports/sumSports;
    else
        X_labels_temp(:,6) = 0;
    end
    numHome = count(curr_labels.Activities,'stayed_home');meanHome = mean(numHome); sumHome = sum(numHome);
    if ~isempty(sumHome)
        X_labels_temp(:,7) = numHome/sumHome;
    else
        X_labels_temp(:,7) = 0;
    end
    numBad = count(curr_labels.Activities,'felt_bad');meanBad = mean(numBad); sumBad = sum(numBad);
    if ~isempty(sumBad)
        X_labels_temp(:,8) = numBad/sumBad;
    else
        X_labels_temp(:,8) = 0;
    end
    % waking hour
    X_labels_temp(:,9) = curr_labels.EyesOpen;
    %sleeping hour
    X_labels_temp(:,10) = curr_labels.LightsOFF;
    % sleeping duration
    sleeping_duration = datestr((curr_labels.EyesOpen - curr_labels.LightsOFF),'HH:MM:SS.FFF'); 
    sleeping_duration = timeofday(datetime(sleeping_duration, 'InputFormat', 'HH:mm:ss.SSS'));
    X_labels_temp(:,11) = datenum(sleeping_duration);
    % number of activities occurred each day
    activities = curr_labels.Activities;
    activity_counts = cellfun(@(X) numel(split(X)), activities);
    X_labels_temp(:,12) = activity_counts;
    % weekday number
    date_time = datetime(curr_labels.Timestamp,'InputFormat','dd-MMM-yyyy HH:mm:ss');
    X_labels_temp(:,13) = weekday(date_time);
end
