function [vff_Spearman, X_train_return, keep_track_return] = remove_additional_features(highestIndices,X_train_cut, keep_track)
    % this function removes the features with the lower feature-label
    % correlation in order to end with only 20 features after vetting

    highestIndices = sort(highestIndices);
    X_train_return = X_train_cut(:,highestIndices);
    keep_track_return = keep_track(highestIndices);
    vff_Spearman=abs(corr(X_train_return,'type','Spearman'));
    vff_Spearman = vff_Spearman-eye(size(X_train_return,2));
end