function [X_sensors_temp] = sensor_features_extraction(sensor_data_day)
    %% calls
    calls_indexs = find(strcmp('calls',sensor_data_day.type));
    if ~isempty(calls_indexs)
        if ~isempty(sensor_data_day.level(calls_indexs))
            time_call_in_sec = sensor_data_day.level(calls_indexs);
            X_sensors_temp(1,1) = sum(time_call_in_sec); % total duration of calls 
            X_sensors_temp(1,2) = length(time_call_in_sec); % number of calls
            X_sensors_temp(1,3) = mean(time_call_in_sec); %mean_time_on_call
        else
            X_sensors_temp(1,1) = NaN; X_sensors_temp(1,2) = NaN; X_sensors_temp(1,3) = NaN;
        end
        if ~isempty(sensor_data_day.sub_type(calls_indexs))
            sub_types = sensor_data_day.sub_type(calls_indexs);
            X_sensors_temp(1,4) = length(find(strcmp('1',sub_types))); %incoming 
            X_sensors_temp(1,5) = length(find(strcmp('2',sub_types))); %outgoing 
            X_sensors_temp(1,6) = length(find(strcmp('3',sub_types))); %missed 
            X_sensors_temp(1,7) = length(find(strcmp('5',sub_types))); %rejected_user 
        else
            X_sensors_temp(1,4) = NaN; X_sensors_temp(1,5) = NaN; X_sensors_temp(1,6) = NaN; X_sensors_temp(1,7) = NaN;
        end
    else
        X_sensors_temp(1,1) = NaN; X_sensors_temp(1,2) = NaN; X_sensors_temp(1,3) = NaN; X_sensors_temp(1,4) = NaN;
        X_sensors_temp(1,5) = NaN; X_sensors_temp(1,6) = NaN; X_sensors_temp(1,7) = NaN;
    end
    
       
    %% wifi
    wifi_indexs = find(strcmp('wifi',sensor_data_day.type));
    if ~isempty(wifi_indexs)
        if ~isempty(sensor_data_day.level(wifi_indexs))
            wifi_strength = abs(sensor_data_day.level(wifi_indexs));
            X_sensors_temp(1,8) = length(unique(sensor_data_day.suuid(wifi_indexs))); %wifi_total_sources
            X_sensors_temp(1,9) =  sum(wifi_strength); %wifi signal strength
            X_sensors_temp(1,10) = max(wifi_strength); %curr_wifi_max_distance_from_source
            X_sensors_temp(1,11) =  mean(wifi_strength); %curr_wifi_min_distance_from_source
            X_sensors_temp(1,12) = length(wifi_strength); %curr_wifi_total_distance_from_all_sources
        else
            X_sensors_temp(1,8) = NaN; X_sensors_temp(1,9) = NaN; X_sensors_temp(1,10) = NaN; X_sensors_temp(1,11) = NaN;
            X_sensors_temp(1,12) = NaN;
        end
    else
        X_sensors_temp(1,8) = NaN; X_sensors_temp(1,9) = NaN; X_sensors_temp(1,10) = NaN; X_sensors_temp(1,11) = NaN;
        X_sensors_temp(1,12) = NaN;
    end
    
        
    %% bluetooth
    bluetooth_indexs = find(strcmp('bluetooth',sensor_data_day.type));
    if ~isempty(bluetooth_indexs)
        bluetooth_total_sources = length(unique(sensor_data_day.suuid(bluetooth_indexs)));
        bluetooth_total_loc = length(unique(sensor_data_day.date_insert_timestamp(bluetooth_indexs)));
        X_sensors_temp(1,13) = bluetooth_total_sources; % bluetooth total sources
        X_sensors_temp(1,14) = bluetooth_total_loc; % bluetooth total times
        curr_bluetooth_sensor_status = sensor_data_day.sensor_status(bluetooth_indexs);
        curr_idx_bluetooth_on = cellfun(@(x) strcmp(x, 'on'), curr_bluetooth_sensor_status);
        if ~isempty(curr_idx_bluetooth_on)
            curr_bluetooth_on_level = sensor_data_day.level(curr_idx_bluetooth_on);
            if ~isempty(curr_bluetooth_on_level(~isnan(curr_bluetooth_on_level)))
                curr_bluetooth_on_level_abs = abs(curr_bluetooth_on_level);
                X_sensors_temp(1,15) = max(curr_bluetooth_on_level_abs); %curr_bluetooth_max_distance_from_source
                X_sensors_temp(1,16) = sum(curr_bluetooth_on_level_abs(~isnan(curr_bluetooth_on_level_abs))); %curr_bluetooth_total_distance_from_all_sources
                X_sensors_temp(1,17) = length(curr_bluetooth_on_level); %bluetooth_was_connect_and_had_level
            else
                X_sensors_temp(1,15) = NaN; X_sensors_temp(1,16) = NaN; X_sensors_temp(1,17) = NaN;
            end
        else
            X_sensors_temp(1,15) = NaN; X_sensors_temp(1,16) = NaN; X_sensors_temp(1,17) = NaN;
        end
    else
        X_sensors_temp(1,13) = NaN; X_sensors_temp(1,14) = NaN; X_sensors_temp(1,15) = NaN; X_sensors_temp(1,16) = NaN;
        X_sensors_temp(1,17) = NaN;
    end
    
    
    %% location
    location_indexs = find(strcmp('location',sensor_data_day.type));
    if ~isempty(location_indexs)
        if ~isempty(sensor_data_day.level(location_indexs))
            level_loc = sensor_data_day.level(location_indexs);
            total_dis = sum(level_loc(~isnan(level_loc)));
            X_sensors_temp(1,18) = total_dis; %total distances (each is tha distance from the last recorded location in meter)
        else
            X_sensors_temp(1,18) = NaN;
        end
    else
        X_sensors_temp(1,18) = NaN;
    end
    
    
    %% light
    light_indexs = find(strcmp('light',sensor_data_day.type));
    if ~isempty(light_indexs)
        if ~isempty(sensor_data_day.x(light_indexs))
            X_sensors_temp(1,19) = median(cellfun(@str2double,sensor_data_day.x(light_indexs))); %total_light
        else
            X_sensors_temp(1,19) = NaN;
        end
    else
        X_sensors_temp(1,19) = NaN; 
    end
    
    
    %% accelerometer
    acc_index = find(strcmp('accelerometer',sensor_data_day.type));
    if ~isempty(acc_index)
        if ~isempty(sensor_data_day.x(acc_index)) && ~isempty(sensor_data_day.y(acc_index)) && ~isempty(sensor_data_day.z(acc_index))
            x = sensor_data_day.x(acc_index);
            x = str2double(x);
            y = sensor_data_day.y(acc_index);
            y = str2double(y);
            z = sensor_data_day.z(acc_index);
            z = str2double(z);
            X_sensors_temp(1,20) = sum(x.^2 + y.^2 + z.^2); %acc_intensity_sum
            X_sensors_temp(1,21) = mean(x.^2 + y.^2 + z.^2); %acc_intensity_mean
            X_sensors_temp(1,22) = mean(x); %acc_mean_x
            X_sensors_temp(1,23) = mean(y); %acc_mean_y
            X_sensors_temp(1,24) = mean(z); %acc_mean_z
            X_sensors_temp(1,25) = rms(z); %acc_rms_z
        else
            X_sensors_temp(1,20) = NaN; X_sensors_temp(1,21) = NaN;
        end
        if ~isempty(sensor_data_day.x(acc_index)) 
            x = sensor_data_day.x(acc_index);
            x = str2double(x);
            X_sensors_temp(1,22) = mean(x); %acc_mean_x
        else
            X_sensors_temp(1,22) = NaN;
        end
        if ~isempty(sensor_data_day.y(acc_index)) 
            y = sensor_data_day.y(acc_index);
            y = str2double(y);
            X_sensors_temp(1,23) = mean(y); %acc_mean_y
        else
            X_sensors_temp(1,23) = NaN;
        end
        if ~isempty(sensor_data_day.z(acc_index)) 
            z = sensor_data_day.z(acc_index);
            z = str2double(z);
            X_sensors_temp(1,24) = mean(z); %acc_mean_z
            X_sensors_temp(1,25) = rms(z); %acc_rms_z 
        else
            X_sensors_temp(1,24) = NaN; X_sensors_temp(1,25) = NaN;
        end  
    else
        X_sensors_temp(1,21) = NaN; X_sensors_temp(1,22) = NaN; X_sensors_temp(1,23) = NaN; X_sensors_temp(1,24) = NaN;
        X_sensors_temp(1,25) = NaN; X_sensors_temp(1,20) = NaN;
    end
    
    
    %% gyroscope 
    gyro_indexs = find(strcmp('gyroscope',sensor_data_day.type));
    if ~isempty(gyro_indexs)
        if ~isempty(sensor_data_day.x(gyro_indexs)) && ~isempty(sensor_data_day.y(gyro_indexs)) && ~isempty(sensor_data_day.z(gyro_indexs))
            xg = sensor_data_day.x(gyro_indexs);
            xg = str2double(xg);
            yg = sensor_data_day.y(gyro_indexs);
            yg = str2double(yg);
            zg = sensor_data_day.z(gyro_indexs);
            zg = str2double(zg);
            X_sensors_temp(1,26) = sum(xg.^2 + yg.^2 + zg.^2); %gyro_intensity_sum
            X_sensors_temp(1,27) = mean(xg.^2 + yg.^2 + zg.^2); %gyro_intensity_mean
            X_sensors_temp(1,28) = mean(xg); %mean_gyro_x
            X_sensors_temp(1,29) = mean(yg); %mean_gyro_y
            X_sensors_temp(1,30) = mean(zg); %mean_gyro_z
            X_sensors_temp(1,31) = rms(zg); %gyro_rms_z 
        else
            X_sensors_temp(1,26) = NaN; X_sensors_temp(1,27) = NaN;
        end
        if ~isempty(sensor_data_day.x(gyro_indexs)) 
            xg = sensor_data_day.x(gyro_indexs);
            xg = str2double(xg);
            X_sensors_temp(1,28) = mean(xg); %gyro_mean_x
        else
            X_sensors_temp(1,28) = NaN;
        end
        if ~isempty(sensor_data_day.y(gyro_indexs)) 
            yg = sensor_data_day.y(gyro_indexs);
            yg = str2double(yg);
            X_sensors_temp(1,29) = mean(yg); %gyro_mean_y
        else
            X_sensors_temp(1,29) = NaN;
        end
        if ~isempty(sensor_data_day.z(gyro_indexs)) 
            zg = sensor_data_day.z(gyro_indexs);
            zg = str2double(zg);
            X_sensors_temp(1,30) = mean(zg); %gyro_mean_z
            X_sensors_temp(1,31) = rms(zg); %gyro_rms_z 
        else
            X_sensors_temp(1,31) = NaN; X_sensors_temp(1,30) = NaN;
        end  
    else
        X_sensors_temp(1,26) = NaN; X_sensors_temp(1,27) = NaN; X_sensors_temp(1,28) = NaN; X_sensors_temp(1,29) = NaN; X_sensors_temp(1,30) = NaN;
        X_sensors_temp(1,31) = NaN; X_sensors_temp(1,30) = NaN;
    end
    
    
    %% battery
    battery_indexs = find(strcmp('battery',sensor_data_day.type));
    if ~isempty(battery_indexs)
        if ~isempty(sensor_data_day.sensor_status(battery_indexs))
            charging_times = sum(contains(sensor_data_day.sensor_status(battery_indexs),'Charging'));
            full_times = sum(contains(sensor_data_day.sensor_status(battery_indexs),'Full'));
            X_sensors_temp(1,32) = charging_times;% charging times
            X_sensors_temp(1,33) = full_times; % full times
        else
            X_sensors_temp(1,32) = NaN;
            X_sensors_temp(1,33) = NaN;
        end
        if ~isempty(sensor_data_day.level(battery_indexs))
            min_battery = min(sensor_data_day.level(battery_indexs));
            X_sensors_temp(1,34) = min_battery; %minimal battery
        else
            X_sensors_temp(1,34) = NaN;
        end
    else
        X_sensors_temp(1,34) = NaN; X_sensors_temp(1,33) = NaN; X_sensors_temp(1,32) = NaN;
    end
    
    %% activity recognition 
    activity_indexs = find(strcmp('activity',sensor_data_day.type));
    if ~isempty(activity_indexs)
        if ~isempty(sensor_data_day.level(activity_indexs))
            X_sensors_temp(1,35) = sum(sensor_data_day.level(activity_indexs)); %total_activity
            X_sensors_temp(1,36) = mean(sensor_data_day.level(activity_indexs)); %mean_activity
        else
            X_sensors_temp(1,35) = NaN; X_sensors_temp(1,36) = NaN;
        end
        if ~isempty(sensor_data_day.sub_type(activity_indexs))
            X_sensors_temp(1,37) = sum(contains(sensor_data_day.sub_type(activity_indexs),'STILL')); %still_activity
            X_sensors_temp(1,38) = sum(contains(sensor_data_day.sub_type(activity_indexs),'ON_FOOT')); %on_foot_activity
            X_sensors_temp(1,39) = sum(contains(sensor_data_day.sub_type(activity_indexs),'IN_VEHICLE')); %in_vehicle_activity
        else
            X_sensors_temp(1,37) = NaN; X_sensors_temp(1,38) = NaN; X_sensors_temp(1,39) = NaN; 
        end
    else
        X_sensors_temp(1,35) = NaN; X_sensors_temp(1,36) = NaN; X_sensors_temp(1,37) = NaN; X_sensors_temp(1,38) = NaN; X_sensors_temp(1,39) = NaN;
    end
    
    %% screen
    n_screen=0;time_off=0;time_on=0;screen_times_day=0;
    screenstate_indexs = find(strcmp('screen',sensor_data_day.type));
    if ~isempty(screenstate_indexs)
        if ~isempty(sensor_data_day.sensor_status(screenstate_indexs))
            n_screen=n_screen+1;
            for n_ind=1:length(screenstate_indexs)
                if isequal(sensor_data_day.sensor_status{screenstate_indexs(n_ind)},'off')
                    time_off=sensor_data_day.date_insert_timestamp(screenstate_indexs(n_ind));
                else
                    time_on=sensor_data_day.date_insert_timestamp(screenstate_indexs(n_ind));
                end
                if time_off>time_on
                    screen_times_day=screen_times_day+time_off-time_on;
                end
                X_sensors_temp(1,40) = screen_times_day; %total duration of time that the screen was 'on'
                sum(contains(sensor_data_day.sensor_status(battery_indexs),'Charging'));
                X_sensors_temp(1,41) = sum(contains(sensor_data_day.sensor_status(screenstate_indexs),'on')); %amount of times that the screen was 'on'
            end
            
        else
            X_sensors_temp(1,41) = NaN; X_sensors_temp(1,40) = NaN;
        end
    else
        X_sensors_temp(1,41) = NaN; X_sensors_temp(1,40) = NaN;
    end   
    %% magnetic_field
    magnetic_indexs = find(strcmp('magnetic_field',sensor_data_day.type));
    if ~isempty(magnetic_indexs)
        if ~isempty(sensor_data_day.level(magnetic_indexs))
            xm = sensor_data_day.x(gyro_indexs);
            xm = str2double(xm);
            ym = sensor_data_day.y(gyro_indexs);
            ym = str2double(ym);
            zm = sensor_data_day.z(gyro_indexs);
            zm = str2double(zm);
            X_sensors_temp(1,42) = sum(xm.^2 + ym.^2 + zm.^2); 
            X_sensors_temp(1,43) = mean(sensor_data_day.level(magnetic_indexs)); %mean_magnetic
        else
            X_sensors_temp(1,42) = NaN; X_sensors_temp(1,43) = NaN;
        end
    else
        X_sensors_temp(1,42) = NaN; X_sensors_temp(1,43) = NaN;
    end
    %% usageStats
    usageStats_indexs = find(strcmp('usageStats',sensor_data_day.type));
    if ~isempty(usageStats_indexs)
        if ~isempty(sensor_data_day.sensor_status(usageStats_indexs))
            values = cellfun(@str2num,(sensor_data_day.sensor_status(usageStats_indexs)));
            X_sensors_temp(1,43) = sum(values); %total_activity
            X_sensors_temp(1,44) = mean(values); %mean_activity
            X_sensors_temp(1,45) = sum(values==0); %games
            X_sensors_temp(1,46) = sum(values==4); %communication
            X_sensors_temp(1,47) = sum(values==7); %productivity
        else
            X_sensors_temp(1,43) = NaN; X_sensors_temp(1,44) = NaN; X_sensors_temp(1,45) = NaN; X_sensors_temp(1,46) = NaN; X_sensors_temp(1,47) = NaN;
        end
    else
        X_sensors_temp(1,43) = NaN; X_sensors_temp(1,44) = NaN; X_sensors_temp(1,45) = NaN; X_sensors_temp(1,46) = NaN; X_sensors_temp(1,47) = NaN;
    end

end
