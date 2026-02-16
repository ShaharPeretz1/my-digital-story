function [labels_table,sleeping_duration] = fix_labels(labels_path)
%%%%%%%%%%%%%%%%%%%% Author's Notes %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% This function's purpose is to organize the labels' data in 4 ways:
% 1. headers of the table would be changed to English
% 2. fix dates that have been modified incorrectly by the user so the day and month were switched
% 3. labels that were added after 00:00 and before 12:00 would be
% considered as added in the privious date. 
% 4. activities would be changed to English
%INPUT: labels file path
%OUTPUT: a table of the labels file data, chronological - clean data
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
labels = readtable(labels_path,'PreserveVariableNames',true);
%% fix (1)
labels.Properties.VariableNames = {'Timestamp','LightsOFF','EyesOpen', 'TodayScore', 'Activities'};

% check if the 'LightsOFF' column and the 'EyesOpen' column are in the
% right order or switched (if swiched- fix the lists names correctly)
label_lightsoff = labels.LightsOFF; %'yesterday'
label_eyesopen = labels.EyesOpen;
if 0.2 < mean(label_eyesopen) && mean(label_eyesopen) < 0.6 % label_eyesopen the correct column
    sleeping_duration = label_eyesopen - label_lightsoff; %for sleeping duration feature
else % label_eyesopen and label_lightsoff should switch
    curr_labels.Properties.VariableNames = {'Timestamp','EyesOpen','LightsOFF','TodayScore', 'Activities'};
    label_lightsoff = labels.LightsOFF;
    label_eyesopen = labels.EyesOpen;
    sleeping_duration = label_eyesopen - label_lightsoff; %for sleeping duration feature
end
%% fix (2)
condition = contains(string(labels.Timestamp),'Feb') | contains(string(labels.Timestamp),'Mar') |...
    contains(string(labels.Timestamp),'Apr') | contains(string(labels.Timestamp),'May') | ...
    contains(string(labels.Timestamp),'Jun') | contains(string(labels.Timestamp),'Jul') |...
    contains(string(labels.Timestamp),'Aug') | contains(string(labels.Timestamp),'Sep');
if sum(condition) ~= 0 
    switched_dates_vec = labels.Timestamp(condition);
    switched_dates_ind = find(condition);
    for n=1:length(switched_dates_vec)
        date = datetime(switched_dates_vec(n));
        [y, month, d] = ymd(date); 
        [h, min, s] = hms(date); 
%         labels.Timestamp(switched_dates_ind(n)) = datestr(datetime(y,d,month,h,min,s));
        if iscell(labels.Timestamp(switched_dates_ind(n)))
            labels.Timestamp{switched_dates_ind(n)} = datestr(datetime(y,d,month,h,min,s));
        else
            labels.Timestamp(switched_dates_ind(n)) = datestr(datetime(y,d,month,h,min,s));
        end
    end
end

%% fix (3)
days = size(labels, 1); 
label_date = cell(days, 1);
for day = 1:days-1
    if iscell(labels.Timestamp(day))
            labels.Timestamp{day} = datestr(datetime(labels.Timestamp{day}));
        else
            labels.Timestamp(day) = datestr(labels.Timestamp(day));
    end

    date0 = datetime(labels.Timestamp(day));
    date1 = datetime(labels.Timestamp(day+1));
    [y0, month0, d0] = ymd(date0); 
    [y1, month1, d1] = ymd(date1); 
    [h, ~, ~] = hms(date0); 

    label_date_curr = datetime(y0, month0, d0);
    label_date_next = datetime(y1, month1, d1);
    label_date(day, 1) = cellstr(label_date_curr);

    if h < 12 && (isequal(label_date_curr,label_date_next) || isequal(label_date_next-1,label_date_curr)) %||isequal(label_date_next-1,label_date_curr+1))
%         labels.Timestamp(day) = datestr(datetime(y0,month0,d0,23,30,00)-1);
        if iscell(labels.Timestamp(day))
            labels.Timestamp{day} = datestr(datetime(y0,month0,d0,23,30,00)-1);
        else
            labels.Timestamp(day) = datestr(datetime(y0,month0,d0,23,30,00)-1);
        end
    end
end
%% fix (4)
    Activities = strrep(labels.Activities,'משפחה','family');
    Activities = strrep(Activities, 'בילוי מאוחר','late_fun');
    Activities = strrep(Activities,'עבודה/מחקר','work_research');
    Activities = strrep(Activities, 'בילוי','fun');
    Activities = strrep(Activities, 'לימודים','studies');
    Activities = strrep(Activities, 'ספורט','sports');
    Activities = strrep(Activities, 'נשארתי בבית כל היום','stayed_home');
    Activities = strrep(Activities, 'הרגשתי לא טוב היום','felt_bad');
    labels.Activities = Activities;
    labels_table = labels;
end
