function [Xv_train, vff_max, vff_mean, vft_max, vft_mean] = features_vetting_fit(X_train, Y_train)

keep_track = ones(1, size(X_train, 2));
keep_track = find(keep_track == 1);

X_train_cut = X_train;

vff_Spearman=abs(corr(X_train_cut,'type','Spearman'));
X_train_cut = X_train_cut(:,~all(isnan(vff_Spearman)));

keep_track = keep_track(~all(isnan(vff_Spearman)));

vff_Spearman=abs(corr(X_train_cut,'type','Spearman'));
vff_Spearman = vff_Spearman-eye(size(X_train_cut,2));

% figure
% heatmap(abs(vff_Spearman))
% title('Spearman correlation - Heatmap')


[rows, cols] = find(vff_Spearman>0.8);



%% feature-label ReliefF Correlation
len=size(X_train_cut,2);
Weights=zeros(len,1);
for j=1:len
    [~,Weights(j)] = relieff(X_train_cut(:,j),Y_train,10,'method','classification');
end
Weights = abs(Weights);

while ~isempty(rows)
    [Xv_train, rows_return, cols_return, keep_track_return, vff_Spearman_return, Weights_return] = remove_high_spirman_corr(rows, cols, X_train_cut, keep_track, Weights);
    X_train_cut = Xv_train;
    Weights = Weights_return;
    rows = rows_return;
    cols = cols_return;
    keep_track = keep_track_return;
    continue
end

vff_Spearman=vff_Spearman_return;
vff_Spearman_vec = reshape(triu(vff_Spearman),1,[]);

% figure
% heatmap(vff_Spearman)
% title('Spearman correlation - Heatmap')

% Find the 20 highest values
[sortedValues, sortedIndices] = sort(Weights, 'descend');
highestValues = sortedValues(1:20);
highestIndices = sortedIndices(1:20);

[vff_Spearman, X_train_return, keep_track_return] = remove_additional_features(highestIndices,X_train_cut, keep_track);
Xv_train = X_train_return;
keep_track = keep_track_return;
% figure
% heatmap(vff_Spearman)
% title('Spearman correlation - Heatmap')


%% feature-label ReliefF Correlation
len=size(Xv_train,2);
Weights=zeros(len,1);
for j=1:len
    [~,Weights(j)] = relieff(Xv_train(:,j),Y_train,10,'method','classification');
end
Weights = abs(Weights);

%% Parameters
vff_max = max(vff_Spearman_vec); 
vff_mean = mean(vff_Spearman_vec);
vft_max = max(Weights);
vft_mean = mean(Weights);
