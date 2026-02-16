function [X, Y, n_0, n_1, n_2] = extract_features(data_labels, data_sensors, folder_path)
%%%%%%%%%%%%%%%%%%%% Author's Notes %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% This function creates features based on the data collected from the
% sensors in the user's cellphone and some features based on the
% information the users provided about every of their days.
% X - a matrix in which each column represents a feature and each row
% represents a different day.
% Y - is a vector with the labels of each day.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
X = [];
Y = [];
n_0 = 0;
n_1 = 0;
n_2 = 0;
num_labels_features = 13;
num_sensor_features = 47;
num_features = num_labels_features+num_sensor_features;
n_instance = 0;
X_sensors_temp = [];
X_user = NaN(3000,num_features);
for user = 1:length(data_labels)
    %% Read labels data
    % the labels data set needed a pre-processing stage and thus was fixed
    % before the features from the label's data were taken
    curr_label_path = strcat(folder_path,'\', data_labels(user).name);
    [curr_labels,sleeping_duration] = fix_labels(curr_label_path);
    curr_labels = flipud(curr_labels);
    % extract lables features
    [X_labels_temp] = labels_features_extraction(curr_labels);

    %% Read sensors data
    curr_data_path = strcat(folder_path,'\', data_sensors(user).name);
    curr_sensors = readtable(curr_data_path,'PreserveVariableNames',true, 'Format', 'auto');
    % extract sensors features
    label_score = curr_labels.TodayScore;
    label_timestamp_first = curr_labels.Timestamp;

    num_miliseconds_in_24h = 24*3600*1000;
    X_sensors_day = [];
    X_sensors_temp = [];
    for day=1:length(label_score)
        label_timestamp_curr = datetime(label_timestamp_first(day));
        %define the start and the end (stop) timestamps of the daily data (BHQ),
        % which belongs to the current label
        start_date = label_timestamp_curr;
        start_date.Hour = 4;
        start_date.Minute = 0;
        start_date.Second = 0;
        start_timestamp = 1000*convertTo(start_date,'posixtime');
        stop_timestamp = start_timestamp+num_miliseconds_in_24h;
        %indexes of the daily data (BHQ) which belongs to the current label
        indexs = find(start_timestamp<curr_sensors.date_insert_timestamp & curr_sensors.date_insert_timestamp>stop_timestamp);
        % if no data exists for the current label - prints the date and a
        % note mentioning that there is no data for this date
        if isempty(indexs)
            fprintf('No data for date %2d/%2d/%4d\n', start_date.Day, start_date.Month, start_date.Year)
            X_sensors_day = NaN(1,num_sensor_features);
        else % if there is data for the current label... 
            [X_sensors_day] = sensor_features_extraction(curr_sensors(indexs,:));
        end
 
        n_instance = n_instance+1;
        %Y_train(n_train_instance) = label_score(n); %the oroginal label
        % Updating the labels- 3 classes 
        if label_score(day)>6
            n_2 = n_2 + 1;
            Y(n_instance,1) = 2;
        elseif label_score(day)>3
            n_1 = n_1 + 1;
            Y(n_instance,1) = 1;
        else
            n_0 = n_0 + 1;
            Y(n_instance,1) = 0;
        end
        X_sensors_temp = [X_sensors_temp;X_sensors_day];
    end
    X_user = [X_labels_temp,X_sensors_temp];
    X = [X;X_user];
end
end



