function [Xv_test, vff_max, vff_mean, vft_max, vft_mean] = features_vetting_transform(X_test, Y_test)
    keep_track = [1	2	5	7	8	9	11	16	24	28	32	34	35	36	38	41	47	49	54	57];
%     keep_track = [3	7	8	9	10	11	16	23	24	28	32	35	36	37	41	44	47	49	52	56];% manualy add the vector recieved affter featrure vetting
    
    Xv_test = X_test(:,keep_track);
    X_test_norm = Xv_test;
    vff_Spearman=abs(corr(X_test_norm,'type','Spearman'));
    validElements_spearman = ~isnan(vff_Spearman); % logical array indicating valid elements
%     figure; 
%     heatmap(vff_Spearman-eye(size(X_test_norm,2)));
%     title('Test Spearman correlation - Heatmap')
    
    vff_max = max(max(vff_Spearman-eye(size(X_test_norm,2)))); %max(vff_Spearman(~eye(size(X_train,2))),'all'); %
    vff_mean = mean(vff_Spearman(validElements_spearman)); %mean(vff_Spearman(~eye(size(X_train,2))),'all'); %
    
    %Feature-Target (label)
    [~, relieff_weights] = relieff(X_test_norm, Y_test, 3);
    validElements_relieff = ~isnan(relieff_weights); % logical array indicating valid elements
    vft_max = max(abs(relieff_weights), [], 'all');
    vft_mean = mean(relieff_weights(validElements_relieff));
end