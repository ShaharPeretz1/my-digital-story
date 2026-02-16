function [vff_max, vff_mean, vft_max, vft_mean] = before_features_vetting_fit(X_train, Y_train)
%% feature-feature correlation
    vff_Spearman=abs(corr(X_train,'type','Spearman'));
    validElements_spearman = ~isnan(vff_Spearman); % logical array indicating valid elements

%     figure; 
%     heatmap(vff_Spearman);
%     title('Spearman correlation - Heatmap')
%     
    vff_max = max(max(vff_Spearman-eye(size(X_train,2)))); %max(vff_Spearman(~eye(size(X_train,2))),'all'); %
    vff_mean = mean(vff_Spearman(validElements_spearman)); %mean(vff_Spearman(~eye(size(X_train,2))),'all'); %
    k = 3; % k nearest neighbors
    %Feature-Target (label)
    [~, relieff_weights] = relieff(X_train, Y_train, k,'method','classification');
    validElements_relief = ~isnan(relieff_weights); % logical array indicating valid elements
    vft_max = max(abs(relieff_weights), [], 'all');
    vft_mean = mean(relieff_weights(validElements_relief));
end